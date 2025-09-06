import React, { useState, useRef, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const DoodleNotepad = ({ isDarkMode, onClose }) => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [formStep, setFormStep] = useState("draw"); 
  const [draggedComment, setDraggedComment] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false); // New state to track if a drag has occurred
  const canvasRef = useRef(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [currentDoodle, setCurrentDoodle] = useState(null);

  // Load comments from Firestore on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doodles"));
        const commentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsList);
      } catch (error) {
      }
    };
    fetchComments();
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      canvas.width = 600;
      canvas.height = 400;
    }
  }, [showForm, isDarkMode]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showForm) {
          cancelForm();
        } else if (showGallery) {
          setShowGallery(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showForm, showGallery]);

  // Get coordinates for both mouse and touch events
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Drawing functions
  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    setLastPosition(coords);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const coords = getCoordinates(e);
    ctx.strokeStyle = isDarkMode ? "#ffffff" : "#000000";
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setLastPosition(coords);
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Enhanced drag functions for both mouse and touch
  const handleDragStart = (e, commentId) => {
    e.preventDefault();
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDraggedComment(commentId);
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setHasDragged(false); // Reset the flag
  };

  const handleDragMove = (e) => {
    if (!draggedComment) return;
    e.preventDefault();
    const container = document.querySelector(".comments-container");
    const containerRect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const newX =
      ((clientX - dragOffset.x - containerRect.left) / containerRect.width) *
      100;
    const newY =
      ((clientY - dragOffset.y - containerRect.top) / containerRect.height) *
      100;
    const boundedX = Math.max(0, Math.min(70, newX));
    const boundedY = Math.max(0, Math.min(70, newY));
    setComments(
      comments.map((comment) =>
        comment.id === draggedComment
          ? { ...comment, position: { x: boundedX, y: boundedY } }
          : comment
      )
    );
    setHasDragged(true); // Mark that a drag has happened
  };

  const handleDragEnd = async () => {
    if (!draggedComment) return;

    // Only update the position in Firestore if a drag actually occurred
    if (hasDragged) {
      const commentToUpdate = comments.find((c) => c.id === draggedComment);
      if (commentToUpdate) {
        try {
          const commentRef = doc(db, "doodles", draggedComment);
          await updateDoc(commentRef, {
            position: commentToUpdate.position,
          });
        } catch (e) {
        }
      }
    }

    setDraggedComment(null);
    setDragOffset({ x: 0, y: 0 });
    setHasDragged(false); // Reset the flag for the next interaction
  };

  // Add event listeners for both mouse and touch drag
  useEffect(() => {
    if (draggedComment) {
      const handleMove = (e) => handleDragMove(e);
      const handleEnd = () => handleDragEnd();

      // Mouse events
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);

      // Touch events
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [draggedComment, dragOffset, comments, hasDragged]);

  const startNewNote = () => {
    setShowForm(true);
    setFormStep("draw");
    setCurrentComment("");
    setCurrentName("");
    setCurrentDoodle(null);
    clearCanvas();
  };

  const nextStep = () => {
    if (formStep === "draw") {
      const canvas = canvasRef.current;
      if (canvas) {
        setCurrentDoodle(canvas.toDataURL());
      }
      setFormStep("name");
    } else if (formStep === "name") {
      setFormStep("comment");
    }
  };

  const prevStep = () => {
    if (formStep === "comment") {
      setFormStep("name");
    } else if (formStep === "name") {
      setFormStep("draw");
    }
  };

  const saveComment = async () => {
    const newComment = {
      name: currentName || "anonymous",
      text: currentComment,
      doodle: currentDoodle || "data:,",
      createInDarkMode: isDarkMode,
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }),
      rotation: (Math.random() - 0.5) * 4,
      position: {
        x: Math.random() * 50 + 5,
        y: Math.random() * 50 + 10,
      },
    };

    try {
      const docRef = await addDoc(collection(db, "doodles"), newComment);
      setComments((prevComments) => [
        ...prevComments,
        { id: docRef.id, ...newComment },
      ]);
      cancelForm();
    } catch (e) {
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setFormStep("draw");
    setCurrentComment("");
    setCurrentName("");
    setCurrentDoodle(null);
    clearCanvas();
  };

  const openGallery = () => {
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  useEffect(() => {
  if (showGallery || showForm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [showGallery, showForm]);


  // The deleteComment function is now unused but is left here in case i need it later.
  const deleteComment = async (id) => {
    try {
      await deleteDoc(doc(db, "doodles", id));
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
    }
  };

  if (showForm && formStep === "draw") {
    return (
      <div
        className={`fixed inset-0 overflow-hidden z-50 font-mono text-xs sm:text-sm flex flex-col items-center transition-all duration-500 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 p-4 flex flex-col flex-1 transition-all duration-500 ${
            isDarkMode ? "md:border-gray-800" : "md:border-gray-300"
          }`}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-8">
            <div className="flex items-center justify-between mb-1">
              <div
                className={`text-xs flex items-center gap-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full pulse ${
                    isDarkMode ? "bg-cyan-400" : "bg-green-500"
                  }`}
                ></div>
                <span className="text-xs sm:text-sm">draw your doodle</span>
              </div>
              <button
                onClick={cancelForm}
                className={`p-1 sm:p-2 rounded-lg transition-all duration-200 hover:scale-110 text-xs ${
                  isDarkMode
                    ? "text-gray-300 hover:text-red-400 hover:bg-gray-900"
                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                }`}
              >
                close
              </button>
            </div>

            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-light tracking-wide">
                sketch something amazing
              </h1>
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                use your finger or mouse to draw
              </p>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-full max-w-2xl">
              <canvas
                ref={canvasRef}
                className={`w-full h-full cursor-crosshair rounded border touch-none ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
                style={{ touchAction: "none" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                onTouchCancel={stopDrawing}
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="mt-4 sm:mt-8">
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={clearCanvas}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded border transition-colors ${
                  isDarkMode
                    ? "border-gray-600 text-gray-400 hover:border-yellow-400 hover:text-yellow-400"
                    : "border-gray-400 text-gray-600 hover:border-yellow-600 hover:text-yellow-600"
                }`}
              >
                clear
              </button>
              <button
                onClick={nextStep}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm rounded font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                next
              </button>
              <button
                onClick={cancelForm}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded border transition-colors ${
                  isDarkMode
                    ? "border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400"
                    : "border-gray-400 text-gray-600 hover:border-red-600 hover:text-red-600"
                }`}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForm && (formStep === "name" || formStep === "comment")) {
    return (
      <div
        className={`fixed inset-0 z-50 font-mono text-xs sm:text-sm p-2 sm:p-4 flex flex-col items-center transition-all duration-500 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 p-4 flex flex-col flex-1 transition-all duration-500 ${
            isDarkMode ? "md:border-gray-800" : "md:border-gray-300"
          }`}
        >
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full">
              {/* Preview */}
              {currentDoodle && (
                <div
                  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded border ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <img
                    src={currentDoodle}
                    alt="Your doodle"
                    className="w-full h-24 sm:h-32 object-contain rounded"
                  />
                </div>
              )}

              {formStep === "name" && (
                <div>
                  <h2 className="text-sm sm:text-base font-light tracking-wide mb-1">
                    what's your name?
                  </h2>
                  <p
                    className={`text-xs mb-4 sm:mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    optional - you can skip this
                  </p>
                  <input
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    className={`w-full text-xs sm:text-sm p-3 border rounded focus:outline-none bg-transparent transition-colors
                      ${
                        isDarkMode
                          ? "border-gray-700 focus:border-cyan-400"
                          : "border-gray-200 focus:border-gray-500"
                      }`}
                    placeholder="enter your name"
                    autoFocus
                  />
                </div>
              )}

              {formStep === "comment" && (
                <div>
                  <h2 className="text-sm sm:text-base font-light tracking-wide mb-1">
                    add a message
                  </h2>
                  <p
                    className={`text-xs mb-4 sm:mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    describe your doodle or leave a note
                  </p>
                  <textarea
                    value={currentComment}
                    onChange={(e) => setCurrentComment(e.target.value)}
                    className={`w-full text-xs sm:text-sm p-3 border rounded focus:outline-none bg-transparent resize-none transition-colors
                      ${
                        isDarkMode
                          ? "border-gray-700 focus:border-cyan-400"
                          : "border-gray-200 focus:border-gray-600"
                      }`}
                    rows="4"
                    placeholder="write your note here"
                    autoFocus
                  />
                </div>
              )}

              <div className="flex gap-2 mt-6 sm:mt-8">
                <button
                  onClick={prevStep}
                  className={`text-xs sm:text-sm px-3 sm:px-4 py-2 border rounded transition-colors ${
                    isDarkMode
                      ? "border-gray-600 text-gray-400 hover:border-white hover:text-white"
                      : "border-gray-400 text-gray-600 hover:border-black hover:text-black"
                  }`}
                >
                  back
                </button>

                {formStep === "name" && (
                  <button
                    onClick={nextStep}
                    className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded transition-colors flex-1 ${
                      isDarkMode
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "bg-gray-600 text-white hover:bg-gray-700"
                    }`}
                  >
                    next
                  </button>
                )}

                {formStep === "comment" && (
                  <button
                    onClick={saveComment}
                    className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded transition-colors flex-1 ${
                      isDarkMode
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "bg-gray-600 text-white hover:bg-gray-700"
                    }`}
                  >
                    save note
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gallery View
  if (showGallery) {
    return (
      <div
        className={`fixed inset-0 overflow-auto z-50 font-mono text-xs sm:text-sm p-2 sm:p-4 flex flex-col items-center transition-all duration-500  ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 p-4 flex flex-col flex-1 transition-all duration-500 ${
            isDarkMode ? "md:border-gray-800" : "md:border-gray-300"
          }`}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-8">
            <div className="flex items-center justify-between mb-1">
              <div
                className={`text-xs flex items-center gap-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full pulse ${
                    isDarkMode ? "bg-cyan-400" : "bg-green-500"
                  }`}
                ></div>
                <span className="text-xs sm:text-sm">all doodles</span>
              </div>

              <button
                onClick={closeGallery}
                className={`p-1 sm:p-2 rounded-lg transition-all duration-200 hover:scale-110 text-xs ${
                  isDarkMode
                    ? "text-gray-300 hover:text-red-400 hover:bg-gray-900"
                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                }`}
              >
                back
              </button>
            </div>

            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-light tracking-wide">
                doodle gallery
              </h1>
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                all saved doodles in one place
              </p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center min-h-0"> 
            {comments.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-xs sm:text-sm opacity-40 uppercase tracking-widest mb-2">
                    no doodles yet
                  </p>
                  <p
                    className={`text-xs opacity-30 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    create your first doodle
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm sm:max-w-md pb-4"> 
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                     className={`border-2 sm:border-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-6 mx-auto w-full max-w-[250px] sm:max-w-xs ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div
                      className={`h-32 sm:h-48 flex items-center justify-center border-b rounded-t ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-gray-100 border-gray-200"
                      }`}
                    >
                      {comment.doodle !== "data:," ? (
                        <img
                          src={comment.doodle}
                          alt="Doodle"
                          className={`w-full h-full object-contain rounded-t p-2 ${
                            isDarkMode !== comment.createInDarkMode ? "invert" : ""
                          }`}
                        />
                      ) : (
                        <div className="text-xs opacity-40">no sketch</div>
                      )}
                    </div>

                    <div className="p-3 sm:p-4">
                      {comment.text && (
                        <p className="text-xs leading-relaxed mb-3 font-light">
                          {comment.text}
                        </p>
                      )}

                      <div className="flex justify-between items-end text-xs">
                        <span className="font-medium uppercase tracking-wide opacity-80 text-xs">
                          {comment.name}
                        </span>
                        <span className="opacity-40 text-xs">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 font-mono text-xs sm:text-sm p-2 sm:p-4 flex flex-col items-center transition-all duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 p-4 flex flex-col flex-1 transition-all duration-500 ${
          isDarkMode ? "md:border-gray-800" : "md:border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center justify-between mb-1">
            <div
              className={`text-xs flex items-center gap-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full pulse ${
                  isDarkMode ? "bg-cyan-400" : "bg-green-500"
                }`}
              ></div>
              <span className="text-xs sm:text-sm">doodle world</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={startNewNote}
                className={`px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-xs font-medium ${
                  isDarkMode
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                + Draw
              </button>
              <button
                onClick={onClose}
                className={`p-1 sm:p-2 rounded-lg transition-all duration-200 hover:scale-110 text-xs ${
                  isDarkMode
                    ? "text-gray-300 hover:text-red-400 hover:bg-gray-900"
                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                }`}
              >
                close
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-light tracking-wide">
              interactive memory board
            </h1>
            <p
              className={`text-xs mt-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              draw, share & drag your doodles around
            </p>
          </div>
        </div>

        {/* Comments Display */}
        <div className="flex-1 relative comments-container min-h-64 sm:min-h-96">
          {comments.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs sm:text-sm opacity-40 uppercase tracking-widest mb-2">
                  no doodles yet
                </p>
                <p
                  className={`text-xs opacity-30 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  tap "add" to start creating
                </p>
              </div>
            </div>
          )}

          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`absolute group cursor-move select-none ${
                draggedComment === comment.id ? "z-50" : ""
              }`}
              style={{
                left: `${comment.position.x}%`,
                top: `${comment.position.y}%`,
                transform: `rotate(${comment.rotation}deg)`,
                maxWidth: window.innerWidth < 640 ? "180px" : "240px",
              }}
              onMouseDown={(e) => handleDragStart(e, comment.id)}
              onTouchStart={(e) => handleDragStart(e, comment.id)}
              onClick={(e) => {
                // Only open gallery if the user has not dragged
                if (!hasDragged) {
                  e.stopPropagation();
                  openGallery();
                }
              }}
            >
              <div
                className={`border-2 sm:border-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                } ${
                  draggedComment === comment.id ? "shadow-2xl scale-105" : ""
                }`}
              >
                <div
                  className={`h-20 sm:h-32 flex items-center justify-center border-b rounded-t ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  {comment.doodle !== "data:," ? (
                    <img
                      src={comment.doodle}
                      alt="Doodle"
                      className={`w-full h-full object-contain rounded-t p-1 ${
                        isDarkMode !== comment.createInDarkMode ? "invert" : ""
                      }`}
                    />
                  ) : (
                    <div className="text-xs opacity-40">no sketch</div>
                  )}
                </div>

                <div className="p-2 sm:p-3">
                  {comment.text && (
                    <p className="text-xs leading-relaxed mb-2 font-light">
                      {comment.text}
                    </p>
                  )}

                  <div className="flex justify-between items-end text-xs">
                    <span className="font-medium uppercase tracking-wide opacity-80 text-xs">
                      {comment.name}
                    </span>
                    <span className="opacity-40 text-xs">
                      {comment.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }
        
        @media (max-width: 640px) {
          .comments-container {
            overflow: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default DoodleNotepad;