// ComingSoonProjectCard.jsx
import React from "react";

const ComingSoonProjectCard = ({ c }) => {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden border ${c.border} rounded-lg shadow-lg transition-all duration-300 transform-gpu ${c.cyanBorder}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            strokeWidth="1"
            stroke={c.fade.replace("text-", "")}
            strokeOpacity="0.3"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            strokeWidth="1"
            stroke={c.fade.replace("text-", "")}
            strokeOpacity="0.3"
          />
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            strokeWidth="1"
            stroke={c.fade.replace("text-", "")}
            strokeOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            strokeWidth="1"
            stroke={c.fade.replace("text-", "")}
            strokeOpacity="0.3"
            fill="none"
          />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            strokeWidth="1"
            stroke={c.fade.replace("text-", "")}
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 h-full">
        <div
          className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-opacity-10"
          style={{ backgroundColor: c.cyan.replace("text-", "#") + "1A" }}
        >
          <svg
            className={`w-8 h-8 ${c.cyan}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${c.accent}`}>
          New Project
        </h3>
        <p className={`text-sm ${c.fade} max-w-xs`}>
          I'm currently developing a new project. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonProjectCard;
