import TextReveal from "../../components/TextReveal";

const AboutArticle = ({
  currentSection,
  setCurrentSection,
  magazineSections,
  setIsImageExpanded,
  openOutro,
  c,
}) => {
  const getContent = () => {
    switch (currentSection) {
      case "profile":
        return (
          <div className="space-y-3">
            <p
              className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}
            >
              Hi, I'm{" "}
              <span
                className={`underline ${c.cyan} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  openOutro();
                }}
              >
                Vishal Gurung
              </span>
              , based in Japan, building software that actually works. I focus
              on clean and reliable code, because good design is nothing without
              function, and I keep pushing myself forward by learning and
              improving every day.
            </p>
          </div>
        );
      case "philosophy":
        return (
          <div className="space-y-3">
            <p
              className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}
            >
              Open source is where I grow the most, because it lets me explore,
              learn from others, and share back what I know. Whether it's GitHub
              projects, YouTube tutorials, or blogs, I dive in, connect the
              dots, and keep expanding what I can do.
            </p>
            <blockquote
              className={`my-4 text-center ${c.accent} text-xs italic font-light border-t border-b ${c.border} py-3`}
            >
              "Good code is its own best documentation."
            </blockquote>
          </div>
        );
      case "inspiration":
        return (
          <div className="space-y-3">
            <p
              className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none`}
            >
              Outside of code, I explore culture and ideas that spark
              creativity, because inspiration doesn't always come from the
              screen. I study trends not just to follow them, but to understand
              them, twist them, and turn them into something better.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-span-8">
      {/* Article Header */}
      <header className="mb-6 sm:mb-8">
        <h1
          className={`${c.accent} text-lg font-medium mb-2 sm:mb-4 leading-tight`}
        >
          {magazineSections.find((s) => s.id === currentSection)?.title}
        </h1>

        <div className={`${c.main} text-xs mb-3 sm:mb-6`}>
          {magazineSections.find((s) => s.id === currentSection)?.subtitle}
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}
        >
          <div className={`${c.fade} text-[10px] sm:text-xs`}>
            published august 2025
          </div>
          <div className={`${c.fade} text-[10px] sm:text-xs font-mono`}>
            Developer • Contributor • Explorer
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <figure className="mb-6 sm:mb-12">
        <div
          className={`relative w-full h-48 sm:h-80 overflow-hidden cursor-pointer group ${c.bg} border ${c.border}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsImageExpanded(true);
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/IMG_4027.jpeg`}
            alt="Vishal Gurung - Developer Profile"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
            <div className="text-[10px] sm:text-xs opacity-80">
              Tokyo, 2025
            </div>
            <div className="text-xs sm:text-sm font-medium">
              Vishal Gurung • Software Developer
            </div>
          </div>
        </div>
        <figcaption
          className={`${c.fade} text-[10px] sm:text-xs mt-2 sm:mt-3 italic text-center`}
        >
          Portrait of a developer in his natural habitat
        </figcaption>
      </figure>

      {/* Article Content */}
      <TextReveal delay={300}>
        <article className="prose prose-sm max-w-none">
          {getContent()}
        </article>
      </TextReveal>

      {/* Article Navigation */}
      <nav className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
        <div
          className={`${c.fade} text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4`}
        >
          read more sections
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          {magazineSections.map((section) => (
            <button
              key={section.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSection(section.id);
              }}
              className={`text-left transition-all duration-300 ${
                currentSection === section.id
                  ? `${c.cyan} font-medium`
                  : `${c.main} hover:${c.cyan}`
              }`}
            >
              <div className="text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">
                {section.title}
              </div>
              <div className={`text-[10px] sm:text-xs opacity-75`}>
                {section.subtitle}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AboutArticle;