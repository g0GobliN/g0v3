import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import ProgressIndicator from './components/ProgressIndicator';
import Section from './components/Section';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import DoodleNotepad from './doodle/DoodleNotepad';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDoodleWorld, setShowDoodleWorld] = useState(false);

  // Initialize theme and load animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('grgvishal.gurung17@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy');
    }
  };

  // Handle keyboard navigation (Escape only)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveSection("");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const content = {
    name: "vishal gurung",
    role: "creates things",
    sections: [
      { key: "about", label: "about" },
      { key: "projects", label: "projects", isProjects: true },
      { key: "blog", label: "blog", isBlog: true },
      { key: "contact", label: "contact", isContact: true },
    ],
  };

  return (
    <>
      <div
        className={`
          ${isDarkMode ? 'dark' : ''} 
          min-h-screen font-mono text-sm p-4 flex flex-col items-center transition-all duration-500
          ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}
        `}
      >
        <style>{`
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
            0%, 100% {
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

        <div className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 flex flex-col flex-1 transition-all duration-500 ${
          isDarkMode 
            ? 'md:border-gray-800' 
            : 'md:border-gray-300'
        }`}>
          
          <Header 
            content={content}
            isDarkMode={isDarkMode}
            isLoaded={isLoaded}
            toggleDarkMode={toggleDarkMode}
            onDoodleClick={() => setShowDoodleWorld(true)}
          />

          <ProgressIndicator 
            sections={content.sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isDarkMode={isDarkMode}
          />

          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-12">
                  {content.sections.map((section, index) => (
                    <Section
                      key={section.key}
                      section={section}
                      index={index}
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                      isDarkMode={isDarkMode}
                      content={content}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      emailCopied={emailCopied}
                      copyEmail={copyEmail}
                    />
                  ))}
                </div>
              }
            />
            <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
          </Routes>

          <Footer 
            content={content}
            currentTime={currentTime}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Doodle World Overlay */}
      {showDoodleWorld && (
        <DoodleNotepad 
          isDarkMode={isDarkMode}
          onClose={() => setShowDoodleWorld(false)}
        />
      )}
    </>
  );
}