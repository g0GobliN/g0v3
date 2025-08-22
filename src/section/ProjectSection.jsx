import React, { useState, useRef } from "react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [expandedNote, setExpandedNote] = useState(null);
  const expandSound = useRef(null);
  const clickSound = useRef(null);
  
  const notes = [
    {
      date: "nov 2024",
      title: "dog api experiment",
      preview: "quick weekend project fetching dog images...",
      content: "built a simple web app that fetches random dog images through rest api calls. focused on mobile-first responsive design and proper error handling. used vanilla javascript with fetch api and async await patterns.",
      tech: "vanilla js • fetch api • responsive design",
      url: "/dog-demo.html",
      reflection: "sometimes the simplest ideas work best. dogs make everyone happy and api fundamentals are worth practicing."
    },
    {
      date: "may 2025", 
      title: "portfolio rebuild",
      preview: "redesigned my personal site from scratch...",
      content: "completely rebuilt this portfolio website with focus on clean typography and smooth interactions. implemented dark mode toggle, css animations, and fully responsive layouts across all device sizes.",
      tech: "react hooks • tailwind css • responsive",
      url: "https://g0goblin.github.io/g0/",
      code: "https://github.com/g0goblin/g0",
      reflection: "meta project challenge: building the thing that showcases the things you build. recursive but necessary."
    }
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-500" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-700/30" : "border-gray-300/30"
  };

  const toggleNote = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Play expand/collapse sound
    if (expandSound.current) {
      expandSound.current.volume = 0.3;
      expandSound.current.currentTime = 0;
      expandSound.current.play();
    }
    
    setExpandedNote(expandedNote === index ? null : index);
  };

  const playClickSound = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Play click sound for links
    if (clickSound.current) {
      clickSound.current.volume = 0.3;
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <div className="max-w-2xl text-xs leading-relaxed">
      {/* Hidden audio elements */}
      <audio ref={expandSound} src="assets/sounds/whoosh.mp3" preload="auto" />
      <audio ref={clickSound} src="assets/sounds/8bit.mp3" preload="auto" />
      
      <div className={`${c.fade} mb-8 italic`}>
        something i've built recently.
      </div>
      
      <div className="space-y-6">
        {notes.map((note, i) => (
          <div 
            key={i}
            className={`${c.border} border-b pb-6 last:border-b-0 last:pb-0`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className={`${c.fade} text-[10px] uppercase tracking-wide`}>
                {note.date}
              </div>
              <button
                onClick={(e) => toggleNote(i, e)}
                className={`${c.fade} text-[10px] hover:${c.main} transition-colors`}
              >
                {expandedNote === i ? 'collapse' : 'expand'}
              </button>
            </div>
            
            {/* Title */}
            <div 
              className={`${c.accent} font-medium mb-2 cursor-pointer hover:opacity-80`}
              onClick={(e) => toggleNote(i, e)}
            >
              {note.title}
            </div>
            
            {/* Preview or full content */}
            <div 
              className={`${c.main} mb-3 cursor-pointer hover:opacity-80`}
              onClick={(e) => toggleNote(i, e)}
            >
              {expandedNote === i ? note.content : note.preview}
            </div>
            
            {/* Tech stack */}
            <div 
              className={`${c.fade} text-[10px] mb-3 cursor-pointer hover:opacity-80`}
              onClick={(e) => toggleNote(i, e)}
            >
              {note.tech}
            </div>
            
            {/* Expanded content */}
            {expandedNote === i && (
              <div className="space-y-3">
                {/* Personal reflection */}
                <div 
                  className={`${c.fade} italic text-[10px] leading-relaxed pl-3 border-l ${c.border} border-l cursor-pointer hover:opacity-80`}
                  onClick={(e) => toggleNote(i, e)}
                >
                  {note.reflection}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  <a 
                    href={note.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${c.accent} text-[10px] underline hover:no-underline transition-all
                    
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (clickSound.current) {
                        clickSound.current.volume = 0.3;
                        clickSound.current.currentTime = 0;
                        clickSound.current.play();
                      }
                      if (note.url === '#') {
                        e.preventDefault();
                      }
                    }}
                  >
                    {note.url === '#' ? 'in progress' : 'view project'}
                  </a>
                  
                  {note.code && (
                    <a 
                      href={note.code}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={`${c.main} text-[10px] underline hover:no-underline hover:${c.accent} transition-all`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (clickSound.current) {
                          clickSound.current.volume = 0.3;
                          clickSound.current.currentTime = 0;
                          clickSound.current.play();
                        }
                      }}
                    >
                      source code
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className={`${c.fade} mt-8 text-[10px] italic text-center`}>
        click any title to read the full note
      </div>
    </div>
  );
};

export default ProjectsSection;