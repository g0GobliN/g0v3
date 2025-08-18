const BlogPost = ({ post, index, isDarkMode, expandedBlogPosts, toggleBlogPost }) => (
  <article 
    className="group"
    style={{ 
      opacity: 0,
      animation: `slideIn 0.6s ease-out ${index * 0.1}s forwards`
    }}
  >
   <div className="relative overflow-hidden rounded mb-4">
  <img
    src={post.image}
    alt={post.title}
    className="
      w-full
      h-32 sm:h-40 md:h-48 lg:h-56
      object-cover
      opacity-90
      group-hover:opacity-100
      group-hover:scale-105
      transition-all
      duration-500
    "
  />
</div>

    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <h3 className={`font-mono text-xs font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {post.title}
        </h3>
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>• {post.readTime}</span>
      </div>
      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {post.excerpt}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleBlogPost(index);
        }}
        className={`text-xs cursor-pointer underline transition-colors duration-200 ${
          isDarkMode 
            ? 'text-gray-500 hover:text-cyan-400' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        {expandedBlogPosts.has(index) ? "read less" : "read more"}
      </button>

      {expandedBlogPosts.has(index) && (
        <div 
          className={`mt-3 text-xs leading-relaxed whitespace-pre-line transition-all duration-500 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
          style={{
            maxHeight: expandedBlogPosts.has(index) ? '2000px' : '0',
            opacity: expandedBlogPosts.has(index) ? 1 : 0
          }}
        >
          {post.content}
        </div>
      )}
    </div>
  </article>
);

export default BlogPost;