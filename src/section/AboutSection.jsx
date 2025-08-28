import { useState } from "react";
import TextReveal from "../components/TextReveal";

const AboutSection = ({ isDarkMode }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState('profile');

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-600",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-700/20" : "border-gray-300/20",
    bg: isDarkMode ? "bg-black" : "bg-white",
    cyan: isDarkMode ? "text-[#00eaf9]" : "text-[#6da8ad]",
    cyanBg: isDarkMode ? "bg-[#00eaf9]" : "bg-[#6da8ad]"
  };

  const magazineSections = [
    {
      id: 'profile',
      title: 'developer profile',
      subtitle: 'crafting software that works'
    },
    {
      id: 'philosophy',
      title: 'code philosophy',
      subtitle: 'function over form, always'
    },
    {
      id: 'inspiration',
      title: 'beyond the screen',
      subtitle: 'culture shapes creativity'
    }
  ];

  const getContent = () => {
    switch(currentSection) {
      case 'profile':
        return (
          <div className="space-y-3">
            <p className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}>
              Hi, I'm{" "}
              <span className={`underline ${c.cyan}`}>
                Vishal Gurung
              </span>
              , based in Japan, building software that actually works. I focus on clean and reliable code, because good design is nothing without function, and I keep pushing myself forward by learning and improving every day.
            </p>
          </div>
        );
      case 'philosophy':
        return (
          <div className="space-y-3">
            <p className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}>
              Open source is where I grow the most, because it lets me explore, learn from others, and share back what I know. Whether it's GitHub projects, YouTube tutorials, or blogs, I dive in, connect the dots, and keep expanding what I can do.
            </p>
            <blockquote className={`my-4 text-center ${c.accent} text-xs italic font-light border-t border-b ${c.border} py-3`}>
              "Good code is its own best documentation."
            </blockquote>
          </div>
        );
      case 'inspiration':
        return (
          <div className="space-y-3">
            <p className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}>
              Outside of code, I explore culture and ideas that spark creativity, because inspiration doesn't always come from the screen. I study trends not just to follow them, but to understand them, twist them, and turn them into something better.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-0" onClick={(e) => e.stopPropagation()}>

        {/* Article Layout */}
        <div className="grid grid-cols-12 gap-4 sm:gap-8">
          
          {/* Main Content Column */}
          <div className="col-span-8">
            
            {/* Article Header */}
            <header className="mb-6 sm:mb-8">

              
              <h1 className={`${c.accent} text-lg font-medium mb-2 sm:mb-4 leading-tight`}>
                {magazineSections.find(s => s.id === currentSection)?.title}
              </h1>
              
              <div className={`${c.main} text-xs mb-3 sm:mb-6`}>
                {magazineSections.find(s => s.id === currentSection)?.subtitle}
              </div>
              
              <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}>
                <div className={`${c.fade} text-[10px] sm:text-xs`}>
                  published august 2025
                </div>
                <div className={`${c.fade} text-[10px] sm:text-xs font-mono`}>
                  Developer • Contributor • Explorer
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="mb-6 sm:mb-12">
              <div 
                className={`relative w-full h-48 sm:h-80 overflow-hidden cursor-pointer group ${c.bg} border ${c.border}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageExpanded(true);
                }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
                  alt="Vishal Gurung - Developer Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                  <div className="text-[10px] sm:text-xs opacity-80">Tokyo, 2025</div>
                  <div className="text-xs sm:text-sm font-medium">Vishal Gurung • Software Developer</div>
                </div>
              </div>
              <figcaption className={`${c.fade} text-[10px] sm:text-xs mt-2 sm:mt-3 italic text-center`}>
                Portrait of a developer in his natural habitat
              </figcaption>
            </figure>

            {/* Article Content */}
            <TextReveal delay={300}>
              <article className="prose prose-sm max-w-none">
                {getContent()}
              </article>
            </TextReveal>

            {/* Article Navigation */}
            <nav className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className={`${c.fade} text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4`}>
                read more sections
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                {magazineSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSection(section.id);
                    }}
                    className={`text-left transition-all duration-300 ${
                      currentSection === section.id 
                        ? `${c.cyan} font-medium` 
                        : `${c.main} hover:${c.cyan}`
                    }`}
                  >
                    <div className="text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">
                      {section.title}
                    </div>
                    <div className={`text-[10px] sm:text-xs opacity-75`}>
                      {section.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Sidebar */}
          <aside className="col-span-4">
            <div className={`sticky top-8 ${c.bg} p-3 sm:p-6 border ${c.border}`}>
              
              {/* Quick Facts */}
              <div className="mb-4 sm:mb-8">
                <h3 className={`${c.accent} font-medium mb-2 sm:mb-4 text-xs uppercase tracking-wider`}>
                  quick facts
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <div className={`${c.fade} text-xs uppercase tracking-wide`}>location</div>
                    <div className={`${c.main} text-xs`}> Japan</div>
                  </div>
                  <div>
                    <div className={`${c.fade} text-xs uppercase tracking-wide`}>focus</div>
                    <div className={`${c.main} text-xs`}>Full-stack Development</div>
                  </div>
                  <div>
                    <div className={`${c.fade} text-xs uppercase tracking-wide`}>passion</div>
                    <div className={`${c.main} text-xs`}>Debugging Life</div>
                  </div>
                </div>
              </div>

              {/* Current Status - Fixed overflow */}
              <div className={`p-3 sm:p-4 border ${c.border} bg-opacity-50 overflow-hidden`}>
                <div className={`${c.accent} text-xs font-medium mb-1 sm:mb-2`}>
                  currently working on
                </div>
                <div className={`${c.fade} text-[10px] sm:text-xs leading-relaxed break-words`}>
                  Making small apps, practicing coding, and discovering new ways to solve problems. 
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Full Screen Image Modal - Fixed for mobile */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setIsImageExpanded(false)}
        >
          {/* Compact Magazine Cover - No longer full height */}
          <div
            className={`relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl transform transition-all duration-500 ${
              isDarkMode ? "bg-black" : "bg-white"
            } shadow-2xl overflow-hidden mx-auto`}
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalFadeIn 0.4s ease-out",
              maxHeight: "80vh" // Limit height to 80% of viewport
            }}
          >
            {/* Close button - Positioned relative to the image container */}
            <button
              className={`absolute top-3 right-3 z-50 p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-800/70 text-gray-200 hover:bg-gray-700/80 focus:ring-[#00eaf9]"
                  : "bg-white/30 text-gray-800 hover:bg-white/50 focus:ring-[#6da8ad]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsImageExpanded(false);
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

            {/* Magazine cover layout - Compact */}
            <div className="relative w-full">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
                alt="Vishal Gurung - Developer Profile"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "70vh" }} // Limit image height
              />
              
              {/* Magazine overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Magazine text - More responsive */}
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
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        /* Custom breakpoint for very small screens */
        @media (max-width: 360px) {
          .xs\\:text-\\[10px\\] {
            font-size: 10px;
          }
          .xs\\:text-base {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default AboutSection;