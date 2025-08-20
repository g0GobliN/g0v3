const ProgressIndicator = ({ sections, activeSection, setActiveSection, isDarkMode }) => {
  const activeIndex = sections.findIndex(s => s.key === activeSection);
  
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
      <div className="relative">
        {/* Progress line */}
        <div className={`absolute left-2 top-2 w-0.5 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
        }`} style={{ height: `${(sections.length - 1) * 48}px` }} />
        
        {/* Active progress line */}
        {activeIndex >= 0 && (
          <div 
            className={`absolute left-2 top-2 w-0.5 transition-all duration-500 ${
              isDarkMode ? 'bg-cyan-400' : 'bg-gray-700'
            }`} 
            style={{ height: `${activeIndex * 48}px` }} 
          />
        )}
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(activeSection === section.key ? "" : section.key)}
              className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                activeIndex >= index
                  ? isDarkMode 
                    ? 'bg-cyan-400 border-cyan-400' 
                    : 'bg-gray-700 border-gray-700'
                  : isDarkMode 
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              title={section.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;