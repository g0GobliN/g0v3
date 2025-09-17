import React from "react";

const ProjectDetails = ({ project, onBack, c }) => {
  return (
    <div className="space-y-6">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBack();
        }}
        className={`underline ${c.fade} ${c.cyanHover} text-xs transition-colors duration-300 flex items-center gap-2`}
      >
        ← back to gallery
      </button>

      <div
        className={`${c.bg} border ${c.border} p-4 sm:p-6 transition-all duration-500`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className={`aspect-[4/5] overflow-hidden border ${c.border} flex items-center justify-center `}>
              <img
                src={project.image}
                alt={project.title}
                 className={`transition-transform duration-300 ${
                  project.id === 3 ? "scale-75" : "w-full h-full object-cover"
                }`}
              />
            </div>
            <div className={`${c.fade} text-xs text-center italic`}>
              {project.title} - {project.category}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div
                className={`${c.cyan} text-xs uppercase tracking-wider mb-2 font-medium`}
              >
                {project.category}
              </div>
              <h2 className={`${c.accent} text-sm sm:text-base font-medium mb-2`}>
                {project.title}
              </h2>
              <p className={`${c.main} text-xs mb-4`}>{project.subtitle}</p>
            </div>

            <div className={`${c.main} text-xs leading-relaxed`}>
              {project.description}
            </div>

            <div className={`pt-4 border-t ${c.border}`}>
              <div className={`${c.fade} text-xs uppercase tracking-wide mb-2`}>
                tech stack
              </div>
              <div className={`${c.main} text-xs font-mono mb-4`}>
                {project.tech}
              </div>
            </div>

            <div className="flex gap-4 text-xs flex-wrap">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${c.fade} ${c.cyanHover} underline transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.url === "#") e.preventDefault();
                }}
              >
                {project.url === "#" ? "coming soon" : "view project →"}
              </a>
              {project.code && project.code !== "#" && (
                <a
                  href={project.code}
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
              published {project.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;