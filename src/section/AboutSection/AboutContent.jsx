import AboutArticle from "./AboutArticle";
import AboutSidebar from "./AboutSidebar";

const AboutContent = ({
  currentSection,
  setCurrentSection,
  magazineSections,
  setIsImageExpanded,
  openOutro,
  c,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-8">
      <AboutArticle
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        magazineSections={magazineSections}
        setIsImageExpanded={setIsImageExpanded}
        openOutro={openOutro}
        c={c}
      />
      <AboutSidebar c={c} />
    </div>
  );
};

export default AboutContent;