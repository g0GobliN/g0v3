import BlogPost from '../components/BlogPost';

const BlogSection = ({ blogPosts, isDarkMode, expandedBlogPosts, toggleBlogPost }) => (
  <div className="pl-8 pb-8 space-y-8">
      <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        read and enjoy
      </div>
    {blogPosts.map((post, index) => (
      <BlogPost 
        key={index}
        post={post}
        index={index}
        isDarkMode={isDarkMode}
        expandedBlogPosts={expandedBlogPosts}
        toggleBlogPost={toggleBlogPost}
      />
    ))}
  </div>
);

export default BlogSection;