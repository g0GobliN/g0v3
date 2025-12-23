import React from "react";

const BlogPost = ({ post, c, isDarkMode, isExpanded, onClose }) => {
  return (
    <div
      className={`transition-all duration-700 ${
        isExpanded ? "opacity-100" : "opacity-0"
      } w-full max-w-6xl mx-auto`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className={`underline ${c.fade} ${c.cyanHover} text-xs transition-colors duration-300 flex items-center gap-2 mt-3 mb-6`}
      >
        ← back to blog
      </button>

      <header className="mb-4 sm:mb-8">
        <div
          className={`text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-6 ${isDarkMode ? `${c.cyan} font-medium` : `${c.fade}`}`}
        >
          {post.category}
        </div>
        <h1
          className={`${c.accent} text-lg font-medium mb-2 sm:mb-4 leading-tight`}
        >
          {post.title}
        </h1>
        <div className={`${c.main} text-xs mb-3 sm:mb-6`}>{post.excerpt}</div>
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 border-t border-b ${c.border} gap-1 sm:gap-0`}
        >
          <div className={`${c.fade} text-[10px] sm:text-xs`}>
            published {post.date}
          </div>
          <div className={`${c.fade} text-[10px] sm:text-xs font-mono`}>
            {post.readTime}
          </div>
        </div>
      </header>

      <div>
        <figure className="mb-4 sm:mb-8">
          <div
            className={`w-full h-48 sm:h-80 overflow-hidden border ${c.border}`}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption
            className={`${c.fade} text-[10px] sm:text-xs mt-2 sm:mt-3 italic text-center`}
          >
            {post.title} - {post.category}
          </figcaption>
        </figure>

        <article className="space-y-3 sm:space-y-6 max-w-4xl">
          <div
            className={`${c.main} text-xs leading-relaxed first-letter:text-2xl first-letter:font-medium first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none whitespace-pre-line`}
          >
            {post.content}
          </div>
          <blockquote
            className={`my-4 sm:my-8 text-center ${c.accent} text-xs italic font-light border-t border-b ${c.border} py-3 sm:py-6`}
          >
            "{post.reflection}"
          </blockquote>

          {post.tags && (
            <div className={`pt-4 sm:pt-6 border-t ${c.border}`}>
              <div
                className={`${c.fade} text-[10px] sm:text-xs uppercase tracking-wide mb-2`}
              >
                tags
              </div>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
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
  );
};

export default BlogPost;
