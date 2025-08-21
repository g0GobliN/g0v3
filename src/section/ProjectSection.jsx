import React, { useState } from "react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [focus, setFocus] = useState(null);
  
  const projects = [
    {
      title: "dog api",
      snippet: "fetching random dog images through rest api calls with mobile-first responsive design and error handling",
      tech: "vanilla javascript fetch api async await",
      url: "/dog-demo.html",
      thoughts: "simple but effective. dogs make everyone happy. api calls are fundamental."
    },
    {
      title: "portfolio",
      snippet: "personal website showcasing projects and skills with dark mode toggle smooth animations and responsive layouts",
      tech: "react hooks tailwind css responsive design",
      url: "https://g0goblin.github.io/g0/",
      code: "https://github.com/g0goblin/g0",
      thoughts: "meta project. building the thing that shows the things you build."
    }
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-500" : "text-gray-500", 
    accent: isDarkMode ? "text-white" : "text-black"
  };

  return (
    <div className="max-w-2xl text-xs leading-loose">
      <div className={`${c.fade} mb-6 italic`}>
        some things i've built recently.
      </div>
      
      {projects.map((p, i) => (
        <div 
          key={i}
          className={`mb-8 pl-8 transition-all duration-500 ${
            focus === i ? 'opacity-100' : focus === null ? 'opacity-100' : 'opacity-30'
          }`}
          onMouseEnter={() => setFocus(i)}
          onMouseLeave={() => setFocus(null)}
        >
          {/* Title inline with description */}
          <div className={`${c.main} mb-2`}>
            <span className={`${c.accent} font-medium`}>{p.title}</span>{' '}
            — {p.snippet}
          </div>
          
          {/* Tech as flowing text */}
          <div className={`${c.fade} mb-2`}>
            built with {p.tech}
          </div>
          
          {/* Personal note */}
          <div className={`${c.fade} italic mb-2 transition-opacity duration-300 ${
            focus === i ? 'opacity-100' : 'opacity-70'
          }`}>
            {p.thoughts}
          </div>
          
          {/* Links naturally embedded */}
          <div className={`${c.main}`} onClick={(e) => e.stopPropagation()}>
            you can{' '}
            <a href={p.url} target="_blank" rel="noopener noreferrer" 
               className={`${c.accent} underline hover:no-underline transition-all`}
               onClick={(e) => e.stopPropagation()}>
              try it here
            </a>
            {p.code && (
              <>
                {' '}or{' '}
                <a href={p.code} target="_blank" rel="noopener noreferrer"
                   className={`${c.accent} underline hover:no-underline transition-all`}
                   onClick={(e) => e.stopPropagation()}>
                  read the code
                </a>
              </>
            )}
          </div>
        </div>
      ))}
      
      <div className={`${c.fade} text-center mt-8 italic`}>
        * always building something new
      </div>
    </div>
  );
};

export default ProjectsSection;