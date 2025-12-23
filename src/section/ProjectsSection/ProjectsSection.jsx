import React, { useState } from "react";
import ProjectGallery from "./ProjectGallery";
import ProjectDetails from "./ProjectDetails";
import useProjectSounds from "./useProjectSounds";

const ProjectsSection = ({ isDarkMode = true }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { playWhooshSound, playBackSound } = useProjectSounds();

  const projects = [
    {
      id: 1,
      date: "dec 2024",
      title: "ZKS-Note",
      subtitle: "a privacy-focused note-taking app",
      description:
        "Developed ZKS-Note, a note-taking app that uses zero-knowledge proofs to protect user privacy. It includes client-side encryption so users can verify ownership of notes without exposing their content. The focus was on secure data handling, authentication, and a smooth UI/UX experience.PS: The project is currently in beta and open-source, so anyone interested can contribute..",
      tech: "react  • tailwind css • ui/ux design",
      url: "https://github.com/g0GobliN/ZKSNote",
      image: "/assets/images/zks.png",
      category: "software development",
    },
    {
      id: 2,
      date: "nov 2024",
      title: "cat gallery",
      subtitle: "a dynamic single-page application",
      description:
        "Built this site to practice HTML, CSS, JavaScript, and API integration. Leveraged the Cat API to dynamically fetch and display cat images with full metadata. Implemented multiple pages like Home, About, and Contact, focusing on responsive design, modular structure, and clean UI/UX.",
      tech: "vanilla js • the cat api • ui/ux design",
      url: "https://g0goblin.github.io/CatGallery/",
      // code: "https://github.com/g0goblin/CatGallery",
      image: "/assets/images/cat2.jpg",
      category: "web development",
    },
    {
      id: 3,
      isComingSoon: true,
      title: "Coming Soon",
      subtitle: "Coming soon… or maybe never, who knows? ¯\\_(ツ)_/¯",
      date: "soon",
      image: "/assets/images/goblin.webp",
      category: "web development",
    },
  ];

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    bg: isDarkMode ? "bg-black" : "bg-white",
    cardBg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    cyan: isDarkMode ? "text-[#00eaf9]" : "text-[#6da8ad]",
    cyanHover: isDarkMode ? "hover:text-[#00eaf9]" : "hover:text-[#6da8ad]",
    cyanBorder: isDarkMode
      ? "hover:border-[#00eaf9]"
      : "hover:border-[#6da8ad]",
  };

  const handleProjectClick = (project) => {
    // Prevent the click action for the "coming soon" card
    // if (project.isComingSoon) return;
    playWhooshSound();
    setSelectedProject(project);
  };

  const handleBackToGallery = () => {
    playBackSound();
    setSelectedProject(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <div className={`${c.fade} text-[11px] mb-4`}>
          selected projects i've developed lately.
        </div>
        <div
          className={`flex justify-between items-center pb-4 border-b ${c.border}`}
        >
          <div className={`${c.main} text-xs`}>
            {selectedProject
              ? "1 project selected"
              : `${projects.length} projects`}
          </div>
          <div className={`${c.fade} text-xs`}>2024 — 2025</div>
        </div>
      </div>

      {!selectedProject ? (
        <ProjectGallery
          projects={projects}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onProjectClick={handleProjectClick}
          isDarkMode={isDarkMode}
          c={c}
        />
      ) : (
        <ProjectDetails
          project={selectedProject}
          onBack={handleBackToGallery}
          c={c}
        />
      )}
    </div>
  );
};

export default ProjectsSection;
