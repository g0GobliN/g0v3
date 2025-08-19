import { useState } from "react";
import TextReveal from "../components/TextReveal";

const AboutSection = ({ isDarkMode }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <>
      {/* About Content */}
      <div
        className="pl-8 pb-8"
        style={{ opacity: 0, animation: "slideIn 0.6s ease-out forwards" }}
      >
        <div className="flex flex-col items-center text-center gap-4 relative">
          {/* Clickable Polaroid */}
          <div
            className={`p-2 transform rotate-1 shadow-lg transition-transform duration-300 hover:rotate-0 cursor-pointer group ${
              isDarkMode
                ? "bg-gray-800 shadow-gray-900/30"
                : "bg-white shadow-gray-400/20"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent parent toggle
              setIsImageExpanded(true);
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
              alt="Vishal Gurung"
              className="w-28 h-28 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className={`text-xs mt-2 text-center font-gotham-book ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Tokyo, 2025
            </div>
          </div>
<TextReveal delay={300}>
  <div className="space-y-4 mb-6 max-w-lg text-justify">
    <p
      className={`text-xs md:text-[13px] leading-relaxed font-gotham-book ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      Hi, I'm{" "}
      <span
        className={`underline ${
          isDarkMode ? "text-cyan-400" : "text-cyan-600"
        }`}
      >
        Vishal Gurung
      </span>
      . Currently in Japan, building software that actually works. Clean, efficient, reliable, no nonsense, no shortcuts.
      I focus on writing code that works well and looks good. Constantly learning, taking on challenges, and leveling up—no fear, just results.
    </p>

    <p
      className={`text-xs md:text-[13px] leading-relaxed font-gotham-book ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      Open-source is my playground. I dive into projects, learn from the best, contribute what I can, and absorb knowledge from GitHub, YouTube, blogs, and anything else that teaches me something new. If it’s out there, I’ll explore it, understand it, and make it better.
    </p>

    <p
      className={`text-xs md:text-[13px] leading-relaxed font-gotham-book ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      When I’m not coding, I explore cultures, find inspiration in the unexpected, and collect ideas like trophies. I don’t just follow trends, I dissect them, learn from them, and sometimes, do it better. Life’s too short for boring code and uninspired projects.
    </p>
  </div>
</TextReveal>

        </div>
      </div>

      {/* Full Screen Polaroid Modal */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(0, 0, 0, 0.9)"
              : "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setIsImageExpanded(false)} // clicking backdrop closes modal
        >
          {/* Close button */}
          <button
            className={`absolute top-4 right-4 z-50 p-4 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              isDarkMode
                ? "bg-gray-800/70 text-gray-200 hover:bg-gray-700/80"
                : "bg-white/30 text-gray-800 hover:bg-white/50"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // prevent parent toggle
              setIsImageExpanded(false);
            }}
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
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

          {/* Large Polaroid */}
          <div
            className={`relative max-w-2xl transform transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()} // ✅ stop propagation for clicks inside modal
            style={{
              animation: "modalFadeIn 0.3s ease-out",
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
              alt="Vishal Gurung - Full Size"
              className="w-full h-auto object-cover max-h-[70vh]"
            />
            <div
              className={`text-center mt-4 space-y-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="text-lg font-gotham-book">Tokyo, 2025</p>
              <p className="text-sm opacity-75">
                Vishal Gurung • Software Developer
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </>
  );
};

export default AboutSection;
