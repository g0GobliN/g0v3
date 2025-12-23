import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ComingSoonProjectCard from "./ComingSoonProjectCard";

const ProjectGallery = ({
  projects,
  currentIndex,
  setCurrentIndex,
  onProjectClick,
  isDarkMode,
  c,
}) => {
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${c.bg} border ${c.border} ${
            currentIndex === 0
              ? `${c.fade} cursor-not-allowed`
              : `${c.accent} hover:${c.cardBg}`
          } transition-all duration-200`}
        >
          <ChevronLeft size={16} />
        </button>

        <div className={`${c.fade} text-xs`}>
          {currentIndex + 1} of {projects.length}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={currentIndex >= projects.length - 1}
          className={`p-2 rounded-full ${c.bg} border ${c.border} ${
            currentIndex >= projects.length - 1
              ? `${c.fade} cursor-not-allowed`
              : `${c.accent} hover:${c.cardBg}`
          } transition-all duration-200`}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Large Project Card */}
      <div className="w-full max-w-xl md:max-w-lg lg:max-w-lg mx-auto transform scale-85 origin-center -mt-3 md:-mt-6">
        {projects.slice(currentIndex, currentIndex + 1).map((project) => (
          <div
            key={project.id}
            onClick={(e) => {
              e.stopPropagation();
              onProjectClick(project);
            }}
            className="cursor-pointer group relative"
          >
            {/* Conditional Rendering logic starts here */}
            {project.isComingSoon ? (
              <ComingSoonProjectCard c={c} />
            ) : (
              // Original card JSX
              <div
                className={`relative aspect-[4/5] overflow-hidden border ${c.border} rounded-lg transition-all duration-300 ${c.cyanBorder}`}
              >
                {/* Image Wrapper */}
                <div className="w-full h-full flex items-center justify-center ">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`transition-transform duration-300 object-cover ${
                      project.id === 3
                        ? "scale-55 mx-auto"
                        : "w-full h-full group-hover:scale-105"
                    }`}
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-white space-y-2">
                    <h3 className="text-xl sm:text-2xl font-medium mb-2 group-hover:text-[#00eaf9] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {project.subtitle}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
                      <div>{project.date}</div>
                      <div>#{String(currentIndex + 1).padStart(2, "0")}</div>
                    </div>
                  </div>
                </div>

                {/* Hover Click Label */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-xs">Click to view</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-0 md:-mt-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? isDarkMode
                  ? "bg-[#00eaf9]"
                  : "bg-black"
                : c.fade
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
