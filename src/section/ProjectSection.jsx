import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const whooshSound = useRef(null);
  const backSound = useRef(null);
  
  const projects = [
    {
      id: 1,
      date: "nov 2024",
      title: "dog api experiment",
      subtitle: "weekend project exploring fetch patterns",
      description: "This project started as a weekend experiment to practice fundamental web development concepts. The goal was simple: create something fun while reinforcing core JavaScript skills. What emerged was a clean, responsive application that demonstrates proper API integration patterns and error handling strategies.",
      tech: "vanilla js • fetch api • responsive design",
      url: "/dog-demo.html",
      code: "#",
      image: "/assets/images/dog2.webp",
      category: "web development",
    },
    {
      id: 2,
      date: "may 2025",
      title: "first portfolio",
      subtitle: "complete redesign from ground up",
      description: "This was my first full-stack portfolio website, and building it was a big milestone for me. It took me about a month to make, trying out different layout ideas before finally settling on this one. I used React, Tailwind CSS, and several NPM tools to build it. Through this project, I learned a lot and felt proud to see how much I could create. The design is clean and simple, focusing more on the content than flashy effects, and every part of it has a purpose.",
      tech: "react • tailwind css • responsive design",
      url: "https://g0goblin.github.io/g0/",
      code: "https://github.com/g0goblin/g0",
      image: "/assets/images/portfolio5.jpg",
      category: "design & development",
    },
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    bg: isDarkMode ? "bg-black" : "bg-white",
    cardBg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    cyan: isDarkMode ? "text-[#00eaf9]" : "text-[#6da8ad]",
    cyanHover: isDarkMode ? "hover:text-[#00eaf9]" : "hover:text-[#6da8ad]",
    cyanBorder: isDarkMode ? "hover:border-[#00eaf9]" : "hover:border-[#6da8ad]",
  };

  const playWhooshSound = () => {
    if (whooshSound.current) {
      whooshSound.current.volume = 0.2;
      whooshSound.current.currentTime = 0;
      whooshSound.current.play().catch(() => {});
    }
  };

  const playBackSound = () => {
    if (backSound.current) {
      backSound.current.volume = 0.2;
      backSound.current.currentTime = 0;
      backSound.current.play().catch(() => {});
    }
  };

  const handleProjectClick = (project, event) => {
    event.stopPropagation();
    playWhooshSound();
    setSelectedProject(project);
  };

  const handleBackToGallery = (event) => {
    event.stopPropagation();
    playBackSound();
    setSelectedProject(null);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Audio elements */}
      <audio ref={whooshSound} preload="auto">
        <source src="/assets/sounds/whoosh.mp3" type="audio/mp3" />
      </audio>
      <audio ref={backSound} preload="auto">
        <source src="/assets/sounds/8bit.mp3" type="audio/mp3" />
      </audio>

      {/* Header */}
      <div className="mb-6">
        <div className={`${c.fade} text-[11px] mb-4`}>selected projects i've developed lately.</div>
        <div className={`flex justify-between items-center pb-4 border-b ${c.border}`}>
          <div className={`${c.main} text-xs`}>
            {selectedProject ? "1 project selected" : `${projects.length} projects`}
          </div>
          <div className={`${c.fade} text-xs`}>2024 — 2025</div>
        </div>
      </div>

      {!selectedProject ? (
        /* Mobile Gallery Style */
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${c.bg} border ${c.border} ${
                currentIndex === 0 ? `${c.fade} cursor-not-allowed` : `${c.accent} hover:${c.cardBg}`
              } transition-all duration-200`}
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className={`${c.fade} text-xs`}>
              {currentIndex + 1} - {Math.min(currentIndex + 2, projects.length)} of {projects.length}
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= projects.length - 2}
              className={`p-2 rounded-full ${c.bg} border ${c.border} ${
                currentIndex >= projects.length - 2 ? `${c.fade} cursor-not-allowed` : `${c.accent} hover:${c.cardBg}`
              } transition-all duration-200`}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Mobile Gallery Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {projects.slice(currentIndex, currentIndex + 2).map((project, index) => (
              <div
                key={project.id}
                onClick={(e) => handleProjectClick(project, e)}
                className="cursor-pointer group"
              >
                {/* Project Image with 4:5 ratio and border - Cyan accent on hover */}
                <div className={`aspect-[4/5] overflow-hidden border ${c.border} rounded-sm mb-2 transition-all duration-300 ${c.cyanBorder}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Project Info */}
                <div className="px-1">
                  <div className="flex items-baseline justify-between mb-1">
                    {/* Project title with cyan hover */}
                    <h3 className={`${c.accent} text-xs font-medium truncate pr-2 transition-colors duration-300 group-hover:${c.cyan}`}>
                      {project.title}
                    </h3>
                    <div className={`${c.fade} text-[10px] flex-shrink-0`}>
                      #{String(currentIndex + index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <p className={`${c.main} text-[10px] mb-1 leading-relaxed`}>
                    {project.subtitle}
                  </p>
                  <div className={`${c.fade} text-[9px] font-mono`}>
                    {project.tech.split(' • ').slice(0, 2).join(' • ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator - Cyan for active dot */}
          <div className="flex justify-center gap-1 mt-6">
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 2)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 2) === index ? c.cyan : c.fade
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Full Project Details */
        <div className="space-y-6">
          {/* Back Button - Cyan hover */}
          <button
            onClick={handleBackToGallery}
            className={`underline ${c.fade} ${c.cyanHover} text-xs transition-colors duration-300 flex items-center gap-2`}
          >
            ← back to gallery
          </button>

          {/* Selected Project Card */}
          <div className={`${c.bg} border ${c.border} p-4 sm:p-6 transition-all duration-500`}>
            <div className="grid grid-cols- sm:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Side - Image */}
              <div className="space-y-4">
                <div className={`aspect-[4/5] overflow-hidden border ${c.border}`}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`${c.fade} text-xs text-center italic`}>
                  {selectedProject.title} - {selectedProject.category}
                </div>
              </div>

              {/* Right Side - Description */}
              <div className="space-y-4">
                <div>
                  {/* Category in cyan */}
                  <div className={`${c.cyan} text-xs uppercase tracking-wider mb-2 font-medium`}>
                    {selectedProject.category}
                  </div>
                  <h2 className={`${c.accent} text-sm sm:text-base font-medium mb-2`}>
                    {selectedProject.title}
                  </h2>
                  <p className={`${c.main} text-xs mb-4`}>
                    {selectedProject.subtitle}
                  </p>
                </div>

                <div className={`${c.main} text-xs leading-relaxed`}>
                  {selectedProject.description}
                </div>

                <div className={`pt-4 border-t ${c.border}`}>
                  <div className={`${c.fade} text-xs uppercase tracking-wide mb-2`}>
                    tech stack
                  </div>
                  <div className={`${c.main} text-xs font-mono mb-4`}>
                    {selectedProject.tech}
                  </div>
                </div>

                {/* Links with cyan hover */}
                <div className="flex gap-4 text-xs flex-wrap">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${c.fade} ${c.cyanHover} underline transition-colors`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedProject.url === "#") e.preventDefault();
                    }}
                  >
                    {selectedProject.url === "#" ? "coming soon" : "view project →"}
                  </a>
                  {selectedProject.code && selectedProject.code !== "#" && (
                    <a
                      href={selectedProject.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${c.fade} ${c.cyanHover} underline transition-colors`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      source code →
                    </a>
                  )}
                </div>

                <div className={`${c.fade} text-xs pt-4 border-t ${c.border}`}>
                  published {selectedProject.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;