import { useState, useEffect } from 'react';

export default function OutroOverlay({ isDarkMode, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 cursor-pointer
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${isDarkMode
          ? 'bg-black bg-opacity-80 backdrop-blur-sm'
          : 'bg-white bg-opacity-80 backdrop-blur-sm'
        }
      `}
      onClick={handleBackdropClick}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%, 50% {
            border-color: transparent;
          }
          51%, 100% {
            border-color: currentColor;
          }
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation:
            typewriter 2s steps(40, end),
            blink 1s step-end infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>

      <div
        className={`
          max-w-xl md:max-w-2xl w-full border rounded-lg p-3 md:p-8 cursor-default font-mono
          transition-all duration-300 ease-in-out
          ${isVisible ? 'fade-in-up' : ''}
          ${isDarkMode
            ? 'bg-black border-gray-800 text-white'
            : 'bg-white border-gray-300 text-black'
          }
          max-h-full overflow-y-auto my-auto
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-2 md:mb-8">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-sm md:text-lg font-normal">thanks for visiting</h2>
            <div className={`w-8 md:w-12 h-px ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
          </div>
          <button
            onClick={handleClose}
            className={`
              text-xs px-2 py-0.5 md:px-3 md:py-1 border rounded transition-colors duration-200
              ${isDarkMode
                ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-900'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
          >
            esc
          </button>
        </div>

        {/* Main Content */}
        <div className="text-xs md:text-sm space-y-3 md:space-y-6">
          <div className="space-y-3">
            <p className="leading-relaxed">
              Thanks for stopping by! I build stuff that hopefully works most of the time. Whether you're curious about my work or just exploring, feel free to get in touch...we might build something cool together.
            </p>
          </div>

          {/* Contact encouragement */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                my inbox is open
              </span>
            </div>
          </div>

           {/* AI / Open-source shoutout */}
          <div className="pt-2 opacity-60 text-2xs italic">
            special thanks to all the geniuses out there: chatgpt, claude ai,
            open-source devs, and caffeine… couldn’t have faked this level of
            professionalism without you.
          </div>

          {/* Signature */}
          <div className="pt-3 md:pt-6 border-t border-opacity-20">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70">with gratitude,</p>
                <p className="typewriter">vishal gurung</p>
              </div>
              <div className="text-xs opacity-50">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className={`
          mt-2 pt-2 border-t text-xs text-center opacity-50
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        `}>
          click outside or press escape to close
        </div>
      </div>
    </div>
  );
}