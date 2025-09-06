// BlogOverview.jsx
import React from "react";

const BlogOverview = ({ blogPosts, c, isDarkMode, onPostClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full">
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
        <article className="mb-6 sm:mb-12">
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
                  onClick={() => !post.skeleton && onPostClick(post)}
                >
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
                  <div className="p-3 sm:p-6">
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
  );
};

export default BlogOverview;