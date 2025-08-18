const ProgressIndicator = ({ sections, activeSection, setActiveSection, isDarkMode }) => (
  <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
    <div className="space-y-2">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => setActiveSection(activeSection === section.key ? "" : section.key)}
          className={`w-1 h-8 rounded transition-all duration-300 ${
            activeSection === section.key
              ? isDarkMode ? 'bg-cyan-400' : 'bg-gray-700'
              : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}
          title={section.label}
        />
      ))}
    </div>
  </div>
);

export default ProgressIndicator;