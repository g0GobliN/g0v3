import React, { useState, useEffect } from "react";

const NotFound = ({ isDarkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const snarkyMessages = [
    "ah shit, here we go again",
    "this page doesn't exist",
    "you've found the void",
    "404: creativity not found",
    "lost in the digital wilderness",
    "the page took a vacation",
  ];

  const [currentMessage] = useState(
    snarkyMessages[Math.floor(Math.random() * snarkyMessages.length)]
  );

  return (
    <div
      className={`font-mono text-sm flex flex-col flex-grow items-center justify-center transition-all duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* Main 404 content */}
      <div
        className="text-center space-y-6 max-w-md"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out 0.2s",
        }}
      >
        {/* ASCII-style 404 */}
        <div
          className={`font-mono leading-tight ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } text-[8px]`}
        >
          <pre>{`
███████╗██████╗ ██████╗  ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔═████╗██╔══██╗
█████╗  ██████╔╝██████╔╝██║██╔██║██████╔╝
██╔══╝  ██╔══██╗██╔══██╗████╔╝██║██╔══██╗
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝`}</pre>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {currentMessage}
          </div>

          <div
            className={`text-xs leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            looks like you've wandered off the beaten path. maybe it's time to
            head back to civilization?
          </div>
        </div>

        {/* Navigation options */}
        <div className="space-y-2">
          <a
            href="/"
            className={`inline-block text-xs underline transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            → back to home
          </a>

          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            or just sit here and contemplate existence
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
