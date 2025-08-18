import TextReveal from "../components/TextReveal";

const AboutSection = ({ isDarkMode }) => (
  <div className="pl-8 pb-8" style={{ opacity: 0, animation: 'slideIn 0.6s ease-out forwards' }}>
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative mr-14">
        <img
          src="/assets/images/IMG_4027.jpeg"
          alt="Profile"
          className={`w-28 h-28 rounded-full object-cover border shadow-sm transition-transform duration-300 hover:scale-105 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}
        />
      </div>
      <TextReveal delay={300}>
        <div className="space-y-4 mb-6 max-w-lg text-left">
          <p className="text-xs md:text-[13px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed font-gotham-book">
            Hi, I'm <span className={`underline ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Vishal Gurung</span>.
            I’m currently studying in Japan and learning how to build useful, clean, and reliable software.
          </p>
            <p className="text-xs md:text-[13px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed font-gotham-book">
              I focus on writing code that works well and looks good. I’m always trying to improve and take on new challenges in development.
            </p>
            <p className="text-xs md:text-[13px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed font-gotham-book">
              When I’m not coding, I enjoy experiencing different cultures and finding inspiration in everyday life.
            </p>
        </div>
      </TextReveal>
    </div>
  </div>
);

export default AboutSection;