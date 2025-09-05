import { Sun, Moon } from "lucide-react";
import DoodleButton from '../doodle/DoodleButton';

const Header = ({
  content,
  isDarkMode,
  isLoaded,
  toggleDarkMode,
  onDoodleClick,
  onNameDoubleClick  // Add this new prop
}) => (
  <div className="mb-20">
    <div className="flex items-center justify-between mb-1">
      <div className={`text-xs flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
        <div className={`w-2 h-2 rounded-full pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-green-500'}`}></div>
        currently online
      </div>
      <div className="flex items-center gap-1">
        {/* Doodle Button */}
        <DoodleButton
          isDarkMode={isDarkMode}
          onClick={onDoodleClick}
        />
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
            isDarkMode
              ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-900'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
    <div style={{
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out'
    }}>
      {/* Updated name with double-click handler */}
      <h1 
        className="text-base font-light tracking-wide cursor-pointer select-none hover:opacity-80 transition-opacity duration-200"
        onDoubleClick={onNameDoubleClick}
        title="Double-click for a special message"
      >
        {content.name}
      </h1>
      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{content.role}</p>
    </div>
  </div>
);

export default Header;