import { useState } from "react";
import { Github, Instagram, Moon, Sun } from "lucide-react";

export default function Portfolio() {
  // About section open by default
  const [activeSection, setActiveSection] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [expandedBlogPosts, setExpandedBlogPosts] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! (This is a demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  const toggleBlogPost = (index) => {
    const newExpanded = new Set(expandedBlogPosts);
    if (newExpanded.has(index)) newExpanded.delete(index);
    else newExpanded.add(index);
    setExpandedBlogPosts(newExpanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const content = {
    name: "alex chen",
    role: "creates things",
    sections: [
      {
        key: "about",
        label: "about",
        content:
          "i design digital experiences that feel effortless.\ncurrently exploring the space between functionality and poetry.\ninterested in minimal systems, human behavior, and the internet.",
      },
      { key: "projects", label: "projects", isProjects: true },
      { key: "blog", label: "blog", isBlog: true },
      { key: "contact", label: "contact", isContact: true },
    ],
    projects: [
      {
        name: "lunar",
        description: "brand identity for space startup",
        year: "2024",
        thumbnail:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
        siteUrl: "https://lunar-demo.com",
        codeUrl: "https://github.com/alexchen/lunar",
      },
      {
        name: "gradient",
        description: "trading platform redesign",
        year: "2023",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
        siteUrl: "https://gradient-demo.com",
        codeUrl: "https://github.com/alexchen/gradient",
      },
      {
        name: "atlas",
        description: "navigation app for urban explorers",
        year: "2023",
        thumbnail:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&crop=center",
        siteUrl: "https://atlas-demo.com",
        codeUrl: "https://github.com/alexchen/atlas",
      },
      {
        name: "void",
        description: "meditation app interface",
        year: "2022",
        thumbnail:
          "https://images.unsplash.com/photo-1516389573391-5620a0263801?w=400&h=300&fit=crop&crop=center",
        siteUrl: "https://void-demo.com",
        codeUrl: "https://github.com/alexchen/void",
      },
    ],
    blogPosts: [
      {
        title: "The Poetry of Empty Space",
        date: "dec 15, 2024",
        excerpt:
          "In Japanese aesthetics, there's a concept called 'ma' - the pregnant pause, the meaningful emptiness between things. In design, we often focus on what to add, but rarely on what to remove. This emptiness isn't absence; it's presence in its most refined form.",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&crop=center",
        content: `In Japanese aesthetics, there's a concept called 'ma' - the pregnant pause, the meaningful emptiness between things. In design, we often focus on what to add, but rarely on what to remove.

This emptiness isn't absence; it's presence in its most refined form. When we strip away the unnecessary, what remains isn't less—it's more. More focused, more intentional, more human.

I've been thinking about this while working on recent projects. Each element removed creates space for the remaining ones to breathe, to speak more clearly. The white space becomes as important as the content itself.

In our attention economy, emptiness becomes a form of resistance. A quiet rebellion against the noise. When everything screams for attention, silence becomes the loudest voice in the room.

The best interfaces feel like they're not there at all. They disappear, leaving only the pure interaction between human and intent. This is the poetry of empty space - not what's there, but what's deliberately not there.

Consider the iPhone's original design. Jobs didn't just add features; he removed everything that wasn't essential. The poetry wasn't in the complexity, but in the simplicity that emerged from thoughtful subtraction.

In my recent work, I've started each project by listing everything I could remove rather than everything I could add. The constraint becomes creative fuel. Limitation becomes liberation.

This isn't minimalism for its own sake. It's clarity of purpose made visible. Every element that remains has earned its place through intentional curation.

The space between notes makes the music. The pause between words gives them weight. In design, the emptiness between elements creates the rhythm that guides the eye and calms the mind.

Maybe the future of design isn't about adding more, but about finding the courage to subtract. To let the emptiness speak. To trust that sometimes, the most powerful thing you can do is nothing at all.`,
      },
      {
        title: "Building with Constraints",
        date: "nov 28, 2024",
        excerpt:
          "Constraints aren't limitations—they're creative catalysts. When we remove infinite possibilities, we're forced to find elegance within boundaries. Some of my best work has emerged from the tightest restrictions.",
        image:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center",
        content: `Constraints aren't limitations—they're creative catalysts. When we remove infinite possibilities, we're forced to find elegance within boundaries.

Some of my best work has emerged from the tightest restrictions. A client with no budget forces creative problem-solving. A tiny screen demands ruthless prioritization. A single color palette pushes you to find depth in simplicity.

The blank canvas is actually the enemy of creativity. It offers too many choices, leading to decision paralysis. Give me a set of constraints, and suddenly the path forward becomes clear.

I remember working on a project where we could only use system fonts. Initially, it felt limiting. But that constraint led us to focus on typography hierarchy, spacing, and rhythm in ways we never would have otherwise. The result was more cohesive and intentional than if we'd had access to thousands of typefaces.

Twitter's 140-character limit didn't stifle expression—it refined it. Haikus don't suffer from having only 17 syllables; they achieve perfection because of it. Constraints force you to distill ideas to their essence.

In my design process, I now artificially create constraints even when none exist. I might limit myself to three colors, or decide to use only one typeface family, or commit to a 4-column grid. These self-imposed boundaries become the creative framework that makes decisions easier and results stronger.

The best constraints come from understanding the problem deeply. Technical limitations, user contexts, business goals—these aren't obstacles to overcome but parameters that guide toward the right solution.

When everything is possible, nothing is meaningful. When possibilities are limited, every choice carries weight. Constraints transform design from decoration into communication.

The iPhone succeeded not because it could do everything, but because it did a few things exceptionally well within tight constraints. Physical buttons were removed. The keyboard was virtual. The interface was touch-only. Each constraint led to innovation.

Embrace the boundaries. Work within the limits. Let constraints become your creative compass. The most beautiful solutions often emerge not from abundance, but from intelligent scarcity.`,
      },
    ],
  };

  const renderProjects = () => (
    <div className="pl-8 pb-8 space-y-6">
      {content.projects.map((project, index) => (
        <div key={index} className="group">
          <div className="flex gap-4 items-start">
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-16 h-12 object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className={`font-mono text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {project.name}
                </h3>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({project.year})</span>
              </div>
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex gap-3">
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs underline transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-500 hover:text-cyan-400' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={isDarkMode ? { color: '#6da8ad' } : {}}
                  onMouseEnter={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#00eaf9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#6da8ad';
                    }
                  }}
                >
                  view site
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs underline transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-500 hover:text-cyan-400' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={isDarkMode ? { color: '#6da8ad' } : {}}
                  onMouseEnter={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#00eaf9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#6da8ad';
                    }
                  }}
                >
                  view code
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBlog = () => (
    <div className="pl-8 pb-8 space-y-8">
      {content.blogPosts.map((post, index) => (
        <article key={index} className="group">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-32 object-cover rounded mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h3 className={`font-mono text-xs font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {post.title}
              </h3>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
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
              style={isDarkMode ? { color: '#6da8ad' } : {}}
              onMouseEnter={(e) => {
                if (isDarkMode) {
                  e.target.style.color = '#00eaf9';
                }
              }}
              onMouseLeave={(e) => {
                if (isDarkMode) {
                  e.target.style.color = '#6da8ad';
                }
              }}
            >
              {expandedBlogPosts.has(index) ? "read less" : "read more"}
            </button>

            {expandedBlogPosts.has(index) && (
              <div className={`mt-3 text-xs leading-relaxed whitespace-pre-line max-h-[2000px] transition-all duration-500 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {post.content}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="pl-8 pb-8">
      <div className="space-y-6">
        <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          let's talk about your project
        </div>

        <div className="space-y-4 max-w-md">
          <div>
            <input
              type="text"
              name="name"
              placeholder="your name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500' 
                  : 'border-gray-200 focus:border-gray-400 text-black placeholder-gray-500'
              }`}
              onFocus={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#00eaf9';
                }
              }}
              onBlur={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#374151';
                }
              }}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="your email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500' 
                  : 'border-gray-200 focus:border-gray-400 text-black placeholder-gray-500'
              }`}
              onFocus={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#00eaf9';
                }
              }}
              onBlur={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#374151';
                }
              }}
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="tell me about your project..."
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none resize-none transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500' 
                  : 'border-gray-200 focus:border-gray-400 text-black placeholder-gray-500'
              }`}
              onFocus={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#00eaf9';
                }
              }}
              onBlur={(e) => {
                if (isDarkMode) {
                  e.target.style.borderBottomColor = '#374151';
                }
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`text-xs underline transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-cyan-400' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={isDarkMode ? { color: '#6da8ad' } : {}}
            onMouseEnter={(e) => {
              if (isDarkMode) {
                e.target.style.color = '#00eaf9';
              }
            }}
            onMouseLeave={(e) => {
              if (isDarkMode) {
                e.target.style.color = '#6da8ad';
              }
            }}
          >
            send message
          </button>
        </div>

        <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <div>a@alexchen.com</div>
            <div className="flex items-center gap-4">
              <span>social:</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/alexchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={isDarkMode ? { color: '#6da8ad' } : {}}
                  onMouseEnter={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#00eaf9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#6da8ad';
                    }
                  }}
                >
                  <Github size={14} />
                </a>
                <a 
                  href="https://instagram.com/alexchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={isDarkMode ? { color: '#6da8ad' } : {}}
                  onMouseEnter={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#00eaf9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDarkMode) {
                      e.target.style.color = '#6da8ad';
                    }
                  }}
                >
                  <Instagram size={14} />
                </a>
              </div>
            </div>
            <div>usually respond within 24 hours</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen font-mono text-sm p-4 flex flex-col items-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      <div className={`max-w-3xl w-full md:border md:border-gray-300 md:rounded-lg md:p-6 flex flex-col flex-1 transition-colors duration-300 ${
        isDarkMode 
          ? 'md:border-gray-800' 
          : 'md:border-gray-300'
      }`}>
        <div className="mb-20">
          <div className="flex items-center justify-between mb-1">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              currently online
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              style={isDarkMode ? { color: '#6da8ad' } : {}}
              onMouseEnter={(e) => {
                if (isDarkMode) {
                  e.target.style.color = '#00eaf9';
                }
              }}
              onMouseLeave={(e) => {
                if (isDarkMode) {
                  e.target.style.color = '#6da8ad';
                }
              }}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <h1 className="text-base font-light tracking-wide">{content.name}</h1>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{content.role}</p>
        </div>

        <div className="space-y-12">
          {content.sections.map((section) => (
            <div
              key={section.key}
              className="group cursor-pointer"
              onClick={() =>
                setActiveSection(
                  activeSection === section.key ? "" : section.key
                )
              }
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className={`text-xs font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  {section.label}
                </span>
                <div className={`flex-1 h-px transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 group-hover:bg-gray-700' 
                    : 'bg-gray-200 group-hover:bg-gray-300'
                }`}></div>
                <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`}>
                  {activeSection === section.key ? "close" : "open"}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  activeSection === section.key
                    ? "max-h-[5000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {section.isProjects ? (
                  renderProjects()
                ) : section.isBlog ? (
                  renderBlog()
                ) : section.isContact ? (
                  renderContact()
                ) : (
                  <div className="pl-8 pb-8">
                    <div className="flex flex-col items-center text-center gap-4">
                      <img
                        src="/images/IMG_4027.jpeg"                         
                        alt="Profile"
                        className={`w-28 h-28 rounded-full object-cover border shadow-sm ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-300'
                        }`}
                      />
                      <div className={`whitespace-pre-line text-xs leading-relaxed ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {section.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-auto pt-32">
          <div className={`w-full border-t text-xs text-center px-4 pt-8 pb-4 ${
            isDarkMode 
              ? 'border-gray-800 text-gray-400' 
              : 'border-gray-200 text-gray-400'
          }`}>
            <div className="space-y-2">
              <div>© {new Date().getFullYear()} {content.name}. All rights reserved.</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {new Date().toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full pt-4">
            <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}