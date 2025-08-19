const Footer = ({ content, currentTime, isDarkMode }) => (
  <div className="w-full mt-auto pt-32">
    <div className={`w-full border-t text-xs text-center px-4 pt-8 pb-4 ${
      isDarkMode 
        ? 'border-gray-800 text-gray-400' 
        : 'border-gray-200 text-gray-400'
    }`}>
      <div className="space-y-2">
       <div>© {new Date().getFullYear()} Vishal Gurung. Not responsible for broken browsers.</div>
        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {currentTime.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
          })}
        </div>
      </div>
    </div>

    <div className="flex justify-center w-full pt-2">
      <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
      }`}></div>
    </div>
  </div>
);

export default Footer;