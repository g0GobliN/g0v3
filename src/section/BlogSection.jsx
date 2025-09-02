import React, { useState, useRef } from "react";

const BlogSection = ({ isDarkMode = true }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const clickSound = useRef(null); // 8bit sound for back to blog
  const openSound = useRef(null); // whoosh sound for opening posts

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
      {/* Hidden audio elements */}
      <audio ref={clickSound} preload="auto">
        <source src="/assets/sounds/8bit.mp3" type="audio/mp3" />
      </audio>
      <audio ref={openSound} preload="auto">
        <source src="/assets/sounds/whoosh.mp3" type="audio/mp3" />
      </audio>

      {/* Magazine Layout - Blog Overview */}
      {!selectedPost && (
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full">
            {/* Article Header */}
            <header className="mb-6 sm:mb-8">
              <div
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}
              >
                <div className={`${c.fade} text-[10px] sm:text-xs`}>
                  {blogPosts.length} articles published
                </div>
                <div className={`${c.fade} text-[10px] sm:text-xs font-mono`}>
                  thoughts, experiments & observations
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article className="mb-6 sm:mb-12">

              {/* Blog Posts Grid */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  {blogPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className={`${c.bg} border ${c.border} overflow-hidden ${
                        post.skeleton
                          ? "cursor-default"
                          : "cursor-pointer group hover:shadow-lg"
                      } transition-all duration-300`}
                      onClick={() => !post.skeleton && handlePostClick(post)}
                    >
                      {/* Post Image */}
                      <div className="aspect-video overflow-hidden">
                        {post.skeleton ? (
                          <div
                            className={`w-full h-full bg-gradient-to-r ${
                              isDarkMode
                                ? "from-gray-800 via-gray-700 to-gray-800"
                                : "from-gray-200 via-gray-100 to-gray-200"
                            } bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]`}
                          >
                            <style>{`
                              @keyframes shimmer {
                                0% {
                                  background-position: -200% 0;
                                }
                                100% {
                                  background-position: 200% 0;
                                }
                              }
                            `}</style>
                          </div>
                        ) : (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="p-3 sm:p-6">
                        {/* Category with cyan only in dark mode for non-skeleton posts */}
                        <div
                          className={`text-[12px] sm:text-xs uppercase tracking-wide mb-1 sm:mb-2 ${
                            post.skeleton ? c.fade : isDarkMode ? `${c.cyan} font-medium` : `${c.fade}`
                          }`}
                        >
                          {post.category}
                        </div>

                        {post.skeleton ? (
                          <>
                            <div
                              className={`h-3 bg-gradient-to-r ${
                                isDarkMode
                                  ? "from-gray-800 via-gray-700 to-gray-800"
                                  : "from-gray-200 via-gray-100 to-gray-200"
                              } bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded mb-2 w-3/4`}
                            ></div>
                            <div
                              className={`h-2 bg-gradient-to-r ${
                                isDarkMode
                                  ? "from-gray-800 via-gray-700 to-gray-800"
                                  : "from-gray-200 via-gray-100 to-gray-200"
                              } bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded mb-1 w-full`}
                            ></div>
                            <div
                              className={`h-2 bg-gradient-to-r ${
                                isDarkMode
                                  ? "from-gray-800 via-gray-700 to-gray-800"
                                  : "from-gray-200 via-gray-100 to-gray-200"
                              } bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded mb-4 w-2/3`}
                            ></div>

                            {/* Skeleton Tags */}
                            <div className="flex flex-wrap gap-1 mb-2 sm:mb-4">
                              {[1, 2, 3].map((_, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className={`h-4 w-16 bg-gradient-to-r ${
                                    isDarkMode
                                      ? "from-gray-800 via-gray-700 to-gray-800"
                                      : "from-gray-200 via-gray-100 to-gray-200"
                                  } bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded`}
                                ></div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Title with cyan hover effect */}
                            <h3
                              className={`${c.accent} text-[12px] sm:text-xs font-medium mb-1 sm:mb-2 leading-tight transition-colors duration-300 group-hover:${c.cyan}`}
                            >
                              {post.title}
                            </h3>
                            <p
                              className={`${c.main} text-[10px] sm:text-xs mb-2 sm:mb-4 leading-relaxed`}
                            >
                              {post.excerpt}
                            </p>

                            {/* Tags with cyan hover */}
                            <div className="flex flex-wrap gap-1 mb-2 sm:mb-4">
                              {post.tags?.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`${c.fade} text-[10px] sm:text-xs px-2 py-1 border ${c.border} rounded-sm transition-colors duration-200 ${c.cyanHover}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Issue Number */}
                        <div
                          className={`${c.fade} text-[10px] sm:text-xs font-mono mt-2 sm:mt-4 pt-2 sm:pt-4 border-t ${c.border} flex justify-between`}
                        >
                          <span>
                            {post.date} • #{String(index + 1).padStart(2, "0")}
                          </span>
                          <span>
                            {post.skeleton ? "— min read" : post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      )}

      {/* Magazine Article View - Individual Post */}
      {selectedPost && (
        <div
          className={`transition-all duration-700 ${
            isExpanded ? "opacity-100" : "opacity-0"
          } w-full max-w-6xl mx-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Back Button with cyan hover */}
          <button
            onClick={handleClose}
            className={`underline ${c.fade} ${c.cyanHover} text-xs transition-colors duration-300 flex items-center gap-2 mb-6`}
          >
            ← back to blog
          </button>

          {/* Article Header */}
          <header className="mb-4 sm:mb-8">
            {/* Category in cyan only in dark mode */}
            <div className={`text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-6 ${isDarkMode ? `${c.cyan} font-medium` : `${c.fade}`}`}>
              {selectedPost.category}
            </div>

            <h1
              className={`${c.accent} text-lg font-medium mb-2 sm:mb-4 leading-tight`}
            >
              {selectedPost.title}
            </h1>

            <div className={`${c.main} text-xs mb-3 sm:mb-6`}>
              {selectedPost.excerpt}
            </div>

            <div
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}
            >
              <div className={`${c.fade} text-[10px] sm:text-xs`}>
                published {selectedPost.date}
              </div>
              <div className={`${c.fade} text-[10px] sm:text-xs font-mono`}>
                {selectedPost.readTime}
              </div>
            </div>
          </header>

          {/* Article Layout - Full Width */}
          <div>
            {/* Hero Image */}
            <figure className="mb-4 sm:mb-8">
              <div className={`w-full h-48 sm:h-80 overflow-hidden border ${c.border}`}>
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`${c.fade} text-[10px] sm:text-xs mt-2 sm:mt-3 italic text-center`}
              >
                {selectedPost.title} - {selectedPost.category}
              </figcaption>
            </figure>

            {/* Article Body */}
            <article className="space-y-3 sm:space-y-6 max-w-4xl">
              <div
                className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none whitespace-pre-line`}
              >
                {selectedPost.content}
              </div>

              {/* Pull Quote */}
              <blockquote
                className={`my-4 sm:my-8 text-center ${c.accent} text-xs italic font-light border-t border-b ${c.border} py-3 sm:py-6`}
              >
                "{selectedPost.reflection}"
              </blockquote>

              {/* Tags at bottom with cyan hover */}
              {selectedPost.tags && (
                <div className={`pt-4 sm:pt-6 border-t ${c.border}`}>
                  <div className={`${c.fade} text-[10px] sm:text-xs uppercase tracking-wide mb-2`}>
                    tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`${c.fade} text-[10px] sm:text-xs px-2 py-1 border ${c.border} rounded-sm transition-colors duration-200 ${c.cyanHover}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSection;