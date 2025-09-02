import React from 'react';

const DoodleButton = ({ isDarkMode, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        isDarkMode
          ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-900'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      }`}
      title="Open Doodle World"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="transition-transform duration-300"
      >
        <path d="m16 16 2-2-4-4"/>
        <path d="m17.5 8.5-4-4a1 1 0 0 0-1.4 0l-10 10a1 1 0 0 0 0 1.4l4 4a1 1 0 0 0 1.4 0l10-10a1 1 0 0 0 0-1.4z"/>
        <path d="m5 15 4 4"/>
      </svg>
    </button>
  );
};

export default DoodleButton;
