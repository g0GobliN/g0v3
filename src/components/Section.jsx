import AboutSection from '../section/AboutSection';
import ProjectsSection from '../section/ProjectSection';
import BlogSection from '../section/BlogSection';
import ContactSection from '../section/ContactSection';

const Section = ({ 
  section, 
  index, 
  activeSection, 
  setActiveSection, 
  isDarkMode,
  content,
  formData,
  handleInputChange,
  handleSubmit,
  expandedBlogPosts,
  toggleBlogPost,
  emailCopied,
  copyEmail,
  submitStatus
}) => {
  const renderSectionContent = () => {
    if (section.isProjects) {
      return <ProjectsSection projects={content.projects} isDarkMode={isDarkMode} />;
    } else if (section.isBlog) {
      return (
        <BlogSection 
          blogPosts={content.blogPosts}
          isDarkMode={isDarkMode}
          expandedBlogPosts={expandedBlogPosts}
          toggleBlogPost={toggleBlogPost}
        />
      );
    } else if (section.isContact) {
      return (
        <ContactSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isDarkMode={isDarkMode}
          emailCopied={emailCopied}
          copyEmail={copyEmail}
          submitStatus={submitStatus}
        />
      );
    } else {
      return <AboutSection content={section.content} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={() =>
        setActiveSection(
          activeSection === section.key ? "" : section.key
        )
      }
      style={{ 
        opacity: 0,
        animation: `slideIn 0.6s ease-out ${index * 0.2}s forwards`
      }}
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className={`text-xs font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          {section.label}
        </span>
        <div className={`flex-1 h-px transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-800 group-hover:bg-gray-700' 
            : 'bg-gray-200 group-hover:bg-gray-300'
        } ${activeSection === section.key ? (isDarkMode ? 'bg-cyan-400' : 'bg-gray-400') : ''}`}></div>
        <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`}>
          {activeSection === section.key ? "close" : "open"}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 ease-out ${
          activeSection === section.key
            ? "max-h-[5000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Section;