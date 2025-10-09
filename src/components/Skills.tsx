import { 
  Database, 
  Globe, 
  Code2, 
  Server, 
  Shield, 
  GitBranch, 
  Terminal,
  Cloud,
  Lock
} from "lucide-react";

const Skills = () => {
  const techStack = [
    {
      category: "Backend",
      icon: <Server className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      technologies: [
        { name: "Node.js", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "REST APIs", level: 95 }
      ]
    },
    {
      category: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      technologies: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5/CSS3", level: 90 }
      ]
    },
    {
      category: "Security",
      icon: <Shield className="w-8 h-8" />,
      color: "from-red-500 to-red-600",
      technologies: [
        { name: "Penetration Testing", level: 85 },
        { name: "RBAC Systems", level: 90 },
        { name: "Vulnerability Assessment", level: 80 },
        { name: "Security Auditing", level: 75 }
      ]
    },
    {
      category: "DevOps",
      icon: <Terminal className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      technologies: [
        { name: "Docker", level: 80 },
        { name: "Git/GitHub", level: 95 },
        { name: "Linux/Bash", level: 85 },
        { name: "CI/CD", level: 70 }
      ]
    }
  ];

  const expertise = [
    { icon: <Database className="w-6 h-6" />, label: "Database Architecture" },
    { icon: <Lock className="w-6 h-6" />, label: "Security Implementation" },
    { icon: <Code2 className="w-6 h-6" />, label: "Full-Stack Development" },
    { icon: <Cloud className="w-6 h-6" />, label: "Cloud Solutions" }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-terminal overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="terminal-text text-lg mb-4 font-mono">
            <span className="text-primary">~$</span> ls -la /skills/
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and methodologies I leverage to build secure, scalable solutions
          </p>
        </div>

        {/* Core Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techStack.map((area, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${area.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {area.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-6 terminal-text">
                {area.category}
              </h3>

              <div className="space-y-4">
                {area.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-foreground">
                        {tech.name}
                      </span>
                      <span className="text-xs terminal-text font-bold">
                        {tech.level}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${area.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${tech.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Highlights */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-8 border border-border">
          <h3 className="text-2xl font-bold terminal-text text-center mb-8">
            Core Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="p-3 rounded-full bg-primary/20 text-primary mb-3 group-hover:bg-primary/30 transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Status */}
        <div className="mt-12 bg-card/20 backdrop-blur-sm rounded-lg p-6 border border-border font-mono text-sm">
          <div className="text-code-comment mb-2">// Current focus areas</div>
          <div className="space-y-1">
            <div><span className="text-code-keyword">const</span> <span className="text-foreground">learning</span> = [</div>
            <div className="ml-4 text-code-string">"Advanced Kubernetes Orchestration",</div>
            <div className="ml-4 text-code-string">"Zero-Trust Security Architecture",</div>
            <div className="ml-4 text-code-string">"Microservices Patterns"</div>
            <div>];</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;