// BlogSection.jsx
import React, { useState, useRef } from "react";
import BlogOverview from "./BlogOverview";
import BlogPost from "./BlogPost";

const blogPosts = [
  {
    id: 1,
    title: "Building My Second Portfolio: Simple and Manageable",
    date: "August 18, 2025",
    excerpt:
      "My first portfolio was cool but too complicated. This time I built a simpler, cleaner version that is easier to use and maintain.",
    readTime: "10 min read",
    category: "development",
    featured: true,
    image:
      "/assets/gif/background6.gif",
    content: `After finishing my first portfolio, I realized I made it way too complicated. There were too many animations, effects, and extra things. It looked nice, but it was hard to manage and fix later.

So I started my second portfolio. The goal was to keep it simple, clean, and easy to manage, but still creative enough to show my skills.

Keeping the Tools, Removing the Extra Stuff
I still used React and Tailwind CSS because they are fast and reliable. React makes components easy to reuse, and Tailwind helps with quick styling. But this time I removed the extra animations and fancy tricks that made things messy.

Simple But Not Boring
The project section is now fully responsive, so it looks good on both phones and big screens. Dark mode is still there, it's useful and people like it.

Even the 404 page is simpler now. It's still fun, but quicker to use. Nobody wants to spend minutes on a 404 page when they just want to see my projects.

I figured this portfolio needed a bit of personality, so I added a shared doodle notepad. Yes, you can draw on my website! This little thing is actually a complete application that saves your creations in a database, where they hang out with all the other doodles. That's how your awesome, highly-artistic note becomes part of the permanent collection for everyone to enjoy.

What I Learned
This project showed me that less is often better. A clean and simple layout shows your skills more clearly than too many effects. I also learned that my future self will thank me for keeping things simple.

What's Next?
I will keep improving, maybe add a small blog or some light interactive features. The main point is: simplicity works best, but personality still matters. One of those interactive features is a shared **doodle notepad** where visitors can leave a quick drawing or a note on a collaborative board, adding a fun and personal touch without complicating the core design.

Thanks for checking it out! Feel free to explore my projects or reach out if you want to talk about web development or design.`,
    tags: ["web development", "portfolio", "react", "design"],
    reflection:
      "Sometimes the best solution is the simplest one. Complexity for its own sake serves no one.",
  },
  {
    id: 2,
    skeleton: true,
    date: "coming soon",
    category: "coming soon",
  },
];

const BlogSection = ({ isDarkMode = true }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const clickSound = useRef(null);
  const openSound = useRef(null);

  const c = {
    main: isDarkMode ? "text-gray-300" : "text-gray-700",
    fade: isDarkMode ? "text-gray-400" : "text-gray-500",
    accent: isDarkMode ? "text-white" : "text-black",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    bg: isDarkMode ? "bg-black" : "bg-white",
    skeleton: isDarkMode ? "bg-gray-800" : "bg-gray-200",
    skeletonShimmer: isDarkMode ? "from-gray-800 via-gray-700 to-gray-800" : "from-gray-200 via-gray-100 to-gray-200",
    cyan: isDarkMode ? "text-[#00eaf9]" : "text-[#6da8ad]",
    cyanHover: isDarkMode ? "hover:text-[#00eaf9]" : "hover:text-[#6da8ad]",
  };

  const playSound = (soundRef) => {
    if (soundRef.current) {
      soundRef.current.volume = 0.3;
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }
  };

  const handlePostClick = (post) => {
    playSound(openSound);
    setSelectedPost(post);
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    playSound(clickSound);
    setIsExpanded(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div className="w-full px-4 sm:px-0" onClick={(e) => e.stopPropagation()}>
      <audio ref={clickSound} preload="auto">
        <source src="/assets/sounds/whoosh.mp3" type="audio/mp3" />
      </audio>
      <audio ref={openSound} preload="auto">
        <source src="/assets/sounds/whoosh.mp3" type="audio/mp3" />
      </audio>

      {!selectedPost && (
        <BlogOverview
          blogPosts={blogPosts}
          c={c}
          isDarkMode={isDarkMode}
          onPostClick={handlePostClick}
        />
      )}

      {selectedPost && (
        <BlogPost
          post={selectedPost}
          c={c}
          isDarkMode={isDarkMode}
          isExpanded={isExpanded}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default BlogSection;