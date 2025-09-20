const Skills = () => {
  const skillCategories = [
    {
      title: "Backend & Databases",
      icon: "🖥️",
      skills: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/336791" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
        { name: "SQL", icon: "https://cdn.simpleicons.org/sqlite/003B57" }
      ]
    },
    {
      title: "Frontend & Styling", 
      icon: "🎨",
      skills: [
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
        { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: "🛠️", 
      skills: [
        { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "Bash", icon: "https://cdn.simpleicons.org/gnubash/4EAA25" }
      ]
    },
    {
      title: "Cybersecurity",
      icon: "🔒",
      skills: [
        { name: "Penetration Testing", level: "Advanced" },
        { name: "Security Auditing", level: "Intermediate" },
        { name: "RBAC Implementation", level: "Advanced" },
        { name: "Vulnerability Assessment", level: "Intermediate" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-terminal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> cat skills.json
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build robust solutions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border hover:shadow-card transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="text-lg font-semibold terminal-text">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3">
                      {skill.icon ? (
                        <>
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6"
                          />
                          <span className="text-sm font-mono text-muted-foreground">
                            {skill.name}
                          </span>
                        </>
                      ) : (
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-mono text-muted-foreground">
                              {skill.name}
                            </span>
                            <span className="text-xs terminal-text">
                              {skill.level}
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-1">
                            <div 
                              className={`h-1 bg-primary rounded-full transition-all duration-500 ${
                                skill.level === 'Advanced' ? 'w-5/6' : 
                                skill.level === 'Intermediate' ? 'w-3/5' : 'w-2/5'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal-style skills summary */}
          <div className="mt-12 bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border font-mono text-sm">
            <div className="code-comment mb-2">// Currently focusing on</div>
            <div className="space-y-1">
              <div><span className="code-keyword">const</span> currentFocus = [</div>
              <div className="ml-4 text-code-string">"Advanced Backend Architecture",</div>
              <div className="ml-4 text-code-string">"Cloud Security Practices",</div>
              <div className="ml-4 text-code-string">"Microservices Design Patterns"</div>
              <div>];</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;