import React, { useState, useRef } from "react";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandSound = useRef(null);
  const clickSound = useRef(null);
  
  const projects = [
    {
      id: 1,
      date: "nov 2024",
      title: "dog api experiment",
      subtitle: "weekend project exploring fetch patterns",
      preview: "quick weekend project fetching dog images...",
      content: "Built a simple web application that fetches random dog images through REST API calls. The project focused on implementing mobile-first responsive design principles and proper error handling patterns. Used vanilla JavaScript with modern fetch API and async/await syntax for clean, readable code. The interface adapts seamlessly across different screen sizes while maintaining optimal user experience.",
      fullStory: "This project started as a weekend experiment to practice fundamental web development concepts. The goal was simple: create something fun while reinforcing core JavaScript skills. What emerged was a clean, responsive application that demonstrates proper API integration patterns and error handling strategies. The dog images bring joy to users while the code underneath showcases solid engineering principles.",
      tech: "vanilla js • fetch api • responsive design",
      url: "/dog-demo.html",
      code: "#",
      reflection: "Sometimes the simplest ideas work best. Dogs make everyone happy and API fundamentals are worth practicing regularly.",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop&auto=format",
      category: "web development",
      featured: true,
      challenges: [
        "Implementing proper error handling for API failures",
        "Creating responsive layouts without frameworks",
        "Optimizing image loading and display performance"
      ],
      learnings: [
        "Vanilla JavaScript is still powerful and relevant",
        "Good error handling improves user experience significantly",
        "Simple projects can showcase fundamental skills effectively"
      ]
    },
    {
      id: 2,
      date: "may 2025", 
      title: "portfolio rebuild",
      subtitle: "complete redesign from ground up",
      preview: "redesigned my personal site from scratch...",
      content: "Completely rebuilt this portfolio website with focus on clean typography, smooth interactions, and user experience. Implemented dark mode toggle functionality, CSS animations, and fully responsive layouts that work seamlessly across all device sizes. The design emphasizes content hierarchy and readability while maintaining visual interest through subtle animations and transitions.",
      fullStory: "This portfolio represents a complete philosophical shift in how I approach personal branding and web design. Moving away from flashy effects toward content-focused design, every element serves a purpose. The magazine-inspired layout creates a professional, editorial feel while the technical implementation showcases modern React patterns and CSS techniques.",
      tech: "react hooks • tailwind css • responsive design",
      url: "https://g0goblin.github.io/g0/",
      code: "https://github.com/g0goblin/g0",
      reflection: "Meta project challenge: building the thing that showcases the things you build. Recursive but necessary.",
      image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&h=600&fit=crop&auto=format",
      category: "design & development",
      featured: true,
      challenges: [
        "Balancing visual appeal with content accessibility",
        "Creating smooth animations without performance impact",
        "Designing a cohesive dark/light mode experience"
      ],
      learnings: [
        "Less can be more when done thoughtfully",
        "Typography and spacing are fundamental design elements",
        "User experience should drive technical decisions"
      ]
    },
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-600",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-700/20" : "border-gray-300/20",
    bg: isDarkMode ? "bg-gray-900" : "bg-white"
  };

  const handleProjectClick = (project) => {
    if (clickSound.current) {
      clickSound.current.volume = 0.3;
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
    
    setSelectedProject(project);
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    
    if (expandSound.current) {
      expandSound.current.volume = 0.3;
      expandSound.current.currentTime = 0;
      expandSound.current.play();
    }
    
    setIsExpanded(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const playLinkClick = (e) => {
    if (clickSound.current) {
      clickSound.current.volume = 0.3;
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <div className="w-full px-4 sm:px-0" onClick={(e) => e.stopPropagation()}>
      {/* Hidden audio elements */}
      <audio ref={expandSound} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaBS6M0fDYeykEMHDHh" type="audio/wav" />
      </audio>
      <audio ref={clickSound} preload="auto">
        <source src="data:audio/wav;base64,UklGRnIGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU4GAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn" type="audio/wav" />
      </audio>

      {/* Magazine Layout - Gallery/Overview */}
      {!selectedProject && (
        <div className="w-full max-w-7xl mx-auto">
        
          {/* Full Width Article Layout */}
          <div className="w-full">
            
            {/* Article Header */}
            <header className="mb-6 sm:mb-12">
              
              <h1 className={`${c.accent} text-lg font-medium mb-3 sm:mb-6 leading-tight`}>
                project gallery
              </h1>
              
              <div className={`${c.main} text-xs mb-4 sm:mb-8 max-w-4xl`}>
                curated collection of work
              </div>
              
              <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-6 border-t border-b ${c.border} gap-1 sm:gap-0`}>
                <div className={`${c.fade} text-xs`}>
                  {projects.length} projects featured
                </div>
                <div className={`${c.fade} text-xs font-mono`}>
                  web development • ui/ux • open source
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article className="mb-8 sm:mb-16">
              <p className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none max-w-4xl mb-6 sm:mb-12`}>
                Each project represents a journey of problem-solving, learning, and creative expression. From simple experiments to complex applications, every piece of work contributes to a larger narrative of growth and technical exploration.
              </p>

              {/* Projects Grid */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  {projects.map((project, index) => (
                    <article
                      key={project.id}
                      className={`${c.bg} border ${c.border} overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300`}
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* Project Image */}
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                      
                      {/* Project Content */}
                      <div className="p-3 sm:p-6">
                        <div className={`${c.fade} text-xs uppercase tracking-wide mb-1 sm:mb-2`}>
                          {project.category}
                        </div>
                        <h3 className={`${c.accent} text-xs font-medium mb-1 sm:mb-2 leading-tight`}>
                          {project.title}
                        </h3>
                        <p className={`${c.main} text-xs mb-2 sm:mb-4 leading-relaxed`}>
                          {project.subtitle}
                        </p>
                        <div className={`${c.fade} text-xs font-mono`}>
                          {project.tech}
                        </div>
                        
                        {/* Issue Number */}
                        <div className={`${c.fade} text-xs font-mono mt-2 sm:mt-4 pt-2 sm:pt-4 border-t ${c.border}`}>
                          {project.date} • #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      )}

      {/* Magazine Article View - Individual Project */}
      {selectedProject && (
        <div className={`transition-all duration-700 ${isExpanded ? 'opacity-100' : 'opacity-0'} w-full max-w-6xl mx-auto`}
          onClick={(e) => e.stopPropagation()}>
          
          {/* Article Header */}
          <header className="mb-4 sm:mb-8">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <div className={`${c.fade} text-xs uppercase tracking-wider`}>
                {selectedProject.category}
              </div>
              <button
                onClick={handleClose}
                className={`${c.fade} hover:${c.main} text-xs transition-colors flex items-center gap-2`}
              >
                ← back to portfolio
              </button>
            </div>
            
            <h1 className={`${c.accent} text-lg font-medium mb-2 sm:mb-4 leading-tight`}>
              {selectedProject.title}
            </h1>
            
            <div className={`${c.main} text-xs mb-3 sm:mb-6`}>
              {selectedProject.subtitle}
            </div>
            
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}>
              <div className={`${c.fade} text-xs`}>
                published {selectedProject.date}
              </div>
              <div className={`${c.fade} text-xs font-mono`}>
                {selectedProject.tech}
              </div>
            </div>
          </header>

          {/* Article Layout */}
          <div className="grid grid-cols-12 gap-4 sm:gap-8">
            
            {/* Main Content */}
            <div className="col-span-8">
              
              {/* Hero Image */}
              <figure className="mb-4 sm:mb-8">
                <div className="w-full h-48 sm:h-80 overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className={`${c.fade} text-xs mt-2 sm:mt-3 italic text-center`}>
                  {selectedProject.title} - {selectedProject.category}
                </figcaption>
              </figure>

              {/* Article Body */}
              <article className="space-y-3 sm:space-y-6">
                <p className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}>
                  {selectedProject.fullStory || selectedProject.content}
                </p>

                {/* Challenges & Learnings */}
                {selectedProject.challenges && (
                  <div className={`${c.bg} p-3 sm:p-6 border ${c.border} my-4 sm:my-8`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                      <div>
                        <h4 className={`${c.accent} font-medium mb-2 sm:mb-3 text-xs uppercase tracking-wider`}>
                          Key Challenges
                        </h4>
                        <ul className={`${c.main} text-xs space-y-1 sm:space-y-2`}>
                          {selectedProject.challenges.map((challenge, index) => (
                            <li key={index}>• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className={`${c.accent} font-medium mb-2 sm:mb-3 text-xs uppercase tracking-wider`}>
                          Key Learnings
                        </h4>
                        <ul className={`${c.main} text-xs space-y-1 sm:space-y-2`}>
                          {selectedProject.learnings.map((learning, index) => (
                            <li key={index}>• {learning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pull Quote */}
                <blockquote className={`my-4 sm:my-8 text-center ${c.accent} text-xs italic font-light border-t border-b ${c.border} py-3 sm:py-6`}>
                  "{selectedProject.reflection}"
                </blockquote>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="col-span-4">
              <div className={`sticky top-8 ${c.bg} p-3 sm:p-6 border ${c.border}`}>
                <h3 className={`${c.accent} font-medium mb-2 sm:mb-4 text-xs uppercase tracking-wider`}>
                  project links
                </h3>
                
                <div className="space-y-2 sm:space-y-4">
                  <a 
                    href={selectedProject.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block ${c.main} text-xs underline hover:no-underline hover:${c.accent} transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      playLinkClick();
                      if (selectedProject.url === '#') {
                        e.preventDefault();
                      }
                    }}
                  >
                    {selectedProject.url === '#' ? 'coming soon' : 'view live project →'}
                  </a>
                  
                  {selectedProject.code && selectedProject.code !== '#' && (
                    <a 
                      href={selectedProject.code}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={`block ${c.main} text-xs underline hover:no-underline hover:${c.accent} transition-all`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playLinkClick();
                      }}
                    >
                      source code →
                    </a>
                  )}
                </div>
                
                <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className={`${c.accent} font-medium mb-2 sm:mb-3 text-xs uppercase tracking-wider`}>
                    tech stack
                  </h4>
                  <div className={`${c.fade} text-xs font-mono leading-relaxed`}>
                    {selectedProject.tech}
                  </div>
                </div>

                <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className={`${c.accent} font-medium mb-2 sm:mb-3 text-xs uppercase tracking-wider`}>
                    project details
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    <div>
                      <div className={`${c.fade} text-xs uppercase tracking-wide`}>category</div>
                      <div className={`${c.main} text-xs`}>{selectedProject.category}</div>
                    </div>
                    <div>
                      <div className={`${c.fade} text-xs uppercase tracking-wide`}>date</div>
                      <div className={`${c.main} text-xs`}>{selectedProject.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;