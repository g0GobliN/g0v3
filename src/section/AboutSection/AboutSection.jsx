import { useState } from "react";
import AboutContent from "./AboutContent";
import ImageModal from "./ImageModal";

const AboutSection = ({ isDarkMode, openOutro }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState("profile");

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-600",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-700/20" : "border-gray-300/20",
    bg: isDarkMode ? "bg-black" : "bg-white",
    cyan: isDarkMode ? "text-[#00eaf9]" : "text-[#6da8ad]",
    cyanBg: isDarkMode ? "bg-[#00eaf9]" : "bg-[#6da8ad]",
  };

  const magazineSections = [
    {
      id: "profile",
      title: "developer profile",
      subtitle: "crafting software that works",
    },
    {
      id: "philosophy",
      title: "code philosophy",
      subtitle: "function over form, always",
    },
    {
      id: "inspiration",
      title: "beyond the screen",
      subtitle: "culture shapes creativity",
    },
  ];

  return (
    <>
      <div
        className="w-full max-w-6xl mx-auto px-4 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <AboutContent
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          magazineSections={magazineSections}
          setIsImageExpanded={setIsImageExpanded}
          openOutro={openOutro}
          c={c}
        />
      </div>

      {isImageExpanded && (
        <ImageModal
          isDarkMode={isDarkMode}
          onClose={() => setIsImageExpanded(false)}
        />
      )}
    </>
  );
};

export default AboutSection;