import { Github, Instagram, Copy, Check } from "lucide-react";
import { useRef } from "react";

const ContactInfo = ({ isDarkMode, emailCopied, copyEmail }) => {
  const copySound = useRef(null);

  const handleCopyClick = (e) => {
    e.stopPropagation();
    if (copySound.current) {
      copySound.current.volume = 0.3; // Set desired volume
      copySound.current.currentTime = 0;
      copySound.current.play();
    }
    copyEmail();
  };

  return (
    <div
      className={`pt-4 border-t ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      {/* Hidden audio element */}
      <audio ref={copySound} src="/assets/sounds/pop_wow.mp3" preload="auto" />

      <div
        className={`text-xs space-y-1 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>grgvishal.gurung17@gmail.com</span>
          <button
            onClick={handleCopyClick}
            className={`p-1 rounded transition-colors duration-200 ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-500 hover:text-cyan-400"
                : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            }`}
            title="Copy email"
          >
            {emailCopied ? <Check size={12} /> : <Copy size={12} />}
          </button>
          {emailCopied && (
            <span
              className={`text-xs ${
                isDarkMode ? "text-cyan-400" : "text-gray-600"
              }`}
            >
              copied!
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span>social:</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/g0GobliN"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? "text-gray-500 hover:text-cyan-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Github size={14} />
            </a>
            <a
              href="https://instagram.com/goblin01_"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? "text-gray-500 hover:text-cyan-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Instagram size={14} />
            </a>

            <a
              href="/assets/Vishal_Gurung_Portfolio_Resume.pdf"
              download
              className="text-xs underline px-2 py-2 rounded transition-colors duration-200 text-cyan-700 hover:text-black "
            >
              Download Resume
            </a>
          </div>
        </div>

        <div>usually respond within 24 hours</div>
      </div>
    </div>
  );
};

export default ContactInfo;
