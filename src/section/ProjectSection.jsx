import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import TextReveal from "../components/TextReveal";

const AnimatedProjectVisual = ({ type, gifUrl, onClick, isDarkMode }) => {
  if (gifUrl) {
    return (
      <div
        className="w-full max-w-xs h-32 bg-gradient-to-br from-gray-800 to-gray-900 
                   rounded-lg overflow-hidden border border-gray-300/50 cursor-pointer hover:scale-105 
                   transform transition-transform duration-300"
        onClick={onClick}
      >
        <img
          src={gifUrl}
          alt="Project demo"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  // Fallback example
  if (type === "dog-api") {
    return (
      <div
        onClick={onClick}
        className="w-full max-w-xs h-32 bg-gradient-to-br from-gray-800 to-gray-900 
                   rounded-lg flex items-center justify-center border border-gray-300/50 overflow-hidden 
                   relative cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        <div className="absolute inset-0">
          <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
          <div
            className="absolute top-3 right-3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-2 left-3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border border-cyan-400/30 rounded flex items-center justify-center">
            <div className="text-cyan-400 font-mono text-[10px] font-medium">
              API
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const ProjectsSection = ({ isDarkMode }) => {
  const [fullscreenProject, setFullscreenProject] = useState(null);

  const projects = [
    {
      title: "Dog API",
      description:
        "A learning project focused on REST API integration, asynchronous requests, and dynamic content rendering. Users can fetch random dog images and browse them in a responsive, mobile-friendly UI.",
      type: "dog-api",
      gifUrl: "/assets/gif/dog.gif",
      url: "/dog-demo.html",
    },
    {
      title: "Responsive Portfolio",
      description:
        "A fully responsive and modern portfolio website built with React and Tailwind CSS, designed to showcase projects, skills, and blog posts. Includes animated sections, smooth transitions, and interactive components for an engaging user experience across desktop and mobile devices.",
      type: "portfolio",
      gifUrl: "/assets/gif/portfolio.gif",
      url: "https://github.com/g0GobliN/g0",
    },
  ];

  return (
    <div
     onClick={(e) => e.stopPropagation()}
      className="pl-8 pb-8"
      style={{ opacity: 0, animation: "slideIn 0.6s ease-out forwards" }}
    >
      <div className="space-y-6">
        <div
          className={`text-xs leading-relaxed ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          some of my recent work
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <TextReveal delay={index * 100}>
                <div className="flex items-center mb-1">
                  <div
                    className={`w-10 h-px ${
                      isDarkMode ? "bg-cyan-400" : "bg-gray-800"
                    }`}
                  ></div>
                  <span
                    className={`ml-2 font-gotham-book-italic text-xs ${
                      isDarkMode ? "text-cyan-400" : "text-gray-800"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </TextReveal>

              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                <div className="flex-1 md:ml-12 space-y-2">
                  <AnimatedProjectVisual
                    type={project.type}
                    gifUrl={project.gifUrl}
                    onClick={() => setFullscreenProject(project)}
                    isDarkMode={isDarkMode}
                  />

                  <TextReveal delay={index * 100 + 200}>
                    <h3
                      className={`text-sm font-gotham-book leading-snug ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </TextReveal>

                  <TextReveal delay={index * 100 + 300}>
                    <p
                      className={`text-xs md:text-[13px] leading-relaxed font-gotham-book ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {project.description}
                    </p>
                  </TextReveal>

                  <TextReveal delay={index * 100 + 400}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1 text-xs underline transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-200 hover:text-cyan-600"
                          : "text-gray-600 hover:text-cyan-700"
                      }`}
                    >
                      <span>View website</span>
                      <ArrowRight size={12} />
                    </a>
                  </TextReveal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenProject && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenProject(null)} // clicking backdrop closes modal
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-cyan-400 transition"
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent toggling parent
              setFullscreenProject(null);
            }}
          >
            <X size={32} />
          </button>

          {/* Modal content */}
          <div
            className="max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // ✅ stop parent clicks
          >
            <img
              src={fullscreenProject.gifUrl}
              alt={fullscreenProject.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <h2 className="text-white text-xl mt-4">
              {fullscreenProject.title}
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              {fullscreenProject.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
