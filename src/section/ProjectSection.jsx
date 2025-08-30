import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const whooshSound = useRef(null);
  const backSound = useRef(null);
  const scrollContainerRef = useRef(null);
  
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
      image: "/assets/gif/dog.gif",
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
      image: "/assets/gif/portfolio.gif",
      category: "design & development",
    },
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    bg: isDarkMode ? "bg-black" : "bg-white",
    skeleton: isDarkMode ? "bg-gray-800" : "bg-gray-200",
    skeletonShimmer: isDarkMode ? "from-gray-800 via-gray-700 to-gray-800" : "from-gray-200 via-gray-100 to-gray-200",
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

  // Navigation functions
  const totalItems = projects.length + 1; // +1 for skeleton
  const itemsPerView = window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const itemWidth = 288 + 24; // w-72 (288px) + gap (24px)
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  // Skeleton component for loading state
  const ProjectSkeleton = ({ index }) => (
    <div className="group flex-shrink-0 w-72">
      {/* Skeleton Image */}
      <div className={`aspect-video ${c.skeleton} mb-3 relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${c.skeletonShimmer} animate-pulse`}></div>
      </div>
      
      {/* Skeleton Info */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <div className={`h-3 w-24 ${c.skeleton} animate-pulse`}></div>
          <div className={`${c.fade} text-xs`}>#{String(index + 1).padStart(2, "0")}</div>
        </div>
        <div className={`h-3 w-32 ${c.skeleton} animate-pulse mb-2`}></div>
        <div className={`h-3 w-28 ${c.skeleton} animate-pulse`}></div>
      </div>
    </div>
  );

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
        <div className={`${c.fade} text-[11px] mb-4`}>selected projects i've developed lately.</div>
        <div className={`flex justify-between items-center pb-4 border-b ${c.border}`}>
          <div className={`${c.main} text-xs`}>
            {selectedProject ? "1 project selected" : `${projects.length + 1} projects`}
          </div>
          <div className={`${c.fade} text-xs`}>2024 — 2025</div>
        </div>
      </div>

      {/* Show Gallery or Selected Project */}
      {!selectedProject ? (
        <div className="relative">
          {/* Navigation Arrows */}
           <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 ${c.bg} ${c.border} border rounded-full 
              ${currentIndex === 0 ? `${c.fade} cursor-not-allowed` : `${c.accent} hover:bg-gray-100 dark:hover:bg-gray-800`} 
              transition-all duration-300 -ml-4`}
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 ${c.bg} ${c.border} border rounded-full 
              ${currentIndex >= maxIndex ? `${c.fade} cursor-not-allowed` : `${c.accent} hover:bg-gray-100 dark:hover:bg-gray-800`} 
              transition-all duration-300 -mr-4`}
          >
            <ChevronRight size={16} />
          </button>

          {/* Project Gallery - Show all projects when none selected */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-hidden gap-6 mb-8 scroll-smooth" 
            onClick={(e) => e.stopPropagation()}
          >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer flex-shrink-0 w-72"
              onClick={(e) => handleProjectClick(project, e)}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden mb-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full scale-120 object-cover transition-all duration-500 group-hover:scale-125"
                />
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className={`${c.accent} text-xs font-medium`}>
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
          
          {/* Skeleton for loading project */}
          <ProjectSkeleton index={projects.length} />
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? c.accent : c.fade
              }`}
            />
          ))}
        </div>
      </div>
      ) : (
        /* Selected Project Details - Show only when project is selected */
        <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
          {/* Back Button */}
          <button
            onClick={handleBackToGallery}
            className={`underline ${c.fade} hover:${c.accent} text-xs transition-colors duration-300 flex items-center gap-2`}
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
                  <h2 className={`${c.accent} text-sm font-medium mb-2`}>
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