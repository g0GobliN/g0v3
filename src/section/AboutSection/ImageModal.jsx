import React from "react";

const ImageModal = ({ isDarkMode, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.95)"
          : "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl transform transition-all duration-500 ${
          isDarkMode ? "bg-black" : "bg-white"
        } shadow-2xl overflow-hidden mx-auto`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "modalFadeIn 0.4s ease-out",
          maxHeight: "80vh",
        }}
      >
        <button
          className={`absolute top-3 right-3 z-50 p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "bg-gray-800/70 text-gray-600 hover:bg-gray-700/80 focus:ring-[#00eaf9]"
              : "bg-white text-gray-800 hover:bg-white/50 focus:ring-[#6da8ad]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative w-full">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
            alt="Vishal Gurung - Developer Profile"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "70vh" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 lg:p-8 text-white">
            <div className="text-[8px] xs:text-[10px] sm:text-xs uppercase tracking-widest mb-1 opacity-80">
              Developer Spotlight
            </div>
            <h2 className="text-sm xs:text-base sm:text-xl lg:text-2xl font-medium sm:font-bold mb-1 sm:mb-2 leading-tight">
              Vishal Gurung
            </h2>
            <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2 lg:mb-4 max-w-md">
              Building software that works • Tokyo, 2025
            </p>
            <div className="text-[8px] xs:text-[10px] sm:text-xs opacity-70 font-mono">
              Full-Stack Developer • Open Source Contributor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;