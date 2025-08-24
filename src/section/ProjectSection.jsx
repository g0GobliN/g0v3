import React, { useState, useRef } from "react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [selectedProject, setSelectedProject] = useState(null);
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
      image: "/assets/images/dogAPI.jpg",
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
      image: "/assets/images/portfolio.jpg",
      category: "design & development",
    },
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    bg: isDarkMode ? "bg-black" : "bg-white",
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
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  const handleBackToGallery = (event) => {
    event.stopPropagation();
    playBackSound();
    setSelectedProject(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0">
      {/* Whoosh sound for opening projects */}
      <audio ref={whooshSound} preload="auto">
        <source src="/assets/sounds/whoosh.mp3" type="audio/mp3" />
      </audio>

      {/* 8bit sound for back button */}
      <audio ref={backSound} preload="auto">
        <source src="/assets/sounds/8bit.mp3" type="audio/mp3" />
      </audio>

      {/* Header */}
      <div className="mb-8">
        <div className={`${c.fade} text-xs mb-4`}>selected work</div>
        <div className={`flex justify-between items-center pb-4 border-b ${c.border}`}>
          <div className={`${c.main} text-xs`}>
            {selectedProject ? "1 project selected" : `${projects.length} projects`}
          </div>
          <div className={`${c.fade} text-xs`}>2024 — 2025</div>
        </div>
      </div>

      {/* Show Gallery or Selected Project */}
      {!selectedProject ? (
        /* Project Gallery - Show all projects when none selected */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" onClick={(e) => e.stopPropagation()}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={(e) => handleProjectClick(project, e)}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden mb-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className={`${c.accent} text-sm font-medium`}>
                    {project.title}
                  </h3>
                  <div className={`${c.fade} text-xs`}>#{String(index + 1).padStart(2, "0")}</div>
                </div>
                <p className={`${c.main} text-xs mb-2`}>
                  {project.subtitle}
                </p>
                <div className={`${c.fade} text-xs font-mono`}>
                  {project.tech}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Selected Project Details - Show only when project is selected */
        <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
          {/* Back Button */}
          <button
            onClick={handleBackToGallery}
            className={`${c.fade} hover:${c.accent} text-xs transition-colors duration-300 flex items-center gap-2`}
          >
            ← back to gallery
          </button>

          {/* Selected Project Card */}
          <div className={`${c.bg} border ${c.border} p-6 transition-all duration-500`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Image */}
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden">
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
                  <div className={`${c.fade} text-xs uppercase tracking-wider mb-2`}>
                    {selectedProject.category}
                  </div>
                  <h2 className={`${c.accent} text-lg font-medium mb-2`}>
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

                <div className="flex gap-4 text-xs">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${c.fade} hover:text-cyan-400 underline transition-colors`}
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
                      className={`${c.fade} hover:text-cyan-400 underline transition-colors`}
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