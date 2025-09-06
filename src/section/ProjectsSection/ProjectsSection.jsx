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
      date: "nov 2024",
      title: "dog api experiment",
      subtitle: "weekend project exploring fetch patterns",
      description:
        "This project started as a weekend experiment to practice fundamental web development concepts. The goal was simple: create something fun while reinforcing core JavaScript skills. What emerged was a clean, responsive application that demonstrates proper API integration patterns and error handling strategies.",
      tech: "vanilla js • fetch api • responsive design",
      url: "/dog-demo.html",
      code: "#",
      image: "/assets/images/dog2.webp",
      category: "web development",
    },
    {
      id: 2,
      date: "may 2025",
      title: "first portfolio",
      subtitle: "complete redesign from ground up",
      description:
        "This was my first full-stack portfolio website, and building it was a big milestone for me. It took me about a month to make, trying out different layout ideas before finally settling on this one. I used React, Tailwind CSS, and several NPM tools to build it. Through this project, I learned a lot and felt proud to see how much I could create. The design is clean and simple, focusing more on the content than flashy effects, and every part of it has a purpose.",
      tech: "react • tailwind css • responsive design",
      url: "https://g0goblin.github.io/g0/",
      code: "https://github.com/g0goblin/g0",
      image: "/assets/images/portfolio5.jpg",
      category: "design & development",
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
    cyanBorder: isDarkMode ? "hover:border-[#00eaf9]" : "hover:border-[#6da8ad]",
  };

  const handleProjectClick = (project) => {
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