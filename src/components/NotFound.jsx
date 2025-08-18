import React from "react";

const NotFound = ({ isDarkMode }) => (
  <div
    className={`flex flex-col items-center justify-center px-4 mt-18 ${
      isDarkMode ? "bg-black text-gray-300" : "bg-white text-gray-700"
    }`}
    style={{ opacity: 0, animation: "slideIn 0.6s ease-out forwards" }}
  >
    <img
      src="/images/IMG_4027.jpeg"
      alt="Profile"
      className={`w-20 h-20 rounded-full object-cover border shadow-sm mb-6 ${
        isDarkMode ? "border-gray-700" : "border-gray-300"
      }`}
    />
    <h1 className="text-3xl font-gotham-book mb-2">404</h1>
    <p className="text-md md:text-lg mb-4 font-gotham-book">
      Oops! The page you’re looking for doesn’t exist.
    </p>
    <a
      href="/"
      className={`text-xs underline px-4 py-2 rounded transition-colors duration-200 ${
        isDarkMode
          ? "text-cyan-400 hover:text-white bg-gray-900"
          : "text-cyan-700 hover:text-black bg-gray-100"
      }`}
    >
      Go back home
    </a>
  </div>
);

export default NotFound;