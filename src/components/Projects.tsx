import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Business Management Platform",
      description: [
        "Engineered a full-stack business management platform, streamlining invoicing and analytics.",
        "Led backend development, building a REST API for dynamic invoice generation and implementing secure Role Based Access Control and authentication.",
        "Collaborated on the React.js frontend and dashboard, to visualize key business metrics.",
      ],
      technologies: ["React", "NodeJS", "ExpressJS", "PostgreSQL", "RBAC"],
      github: "https://github.com/SerAbin1/jobQueue",
      demo: "https://www.industechautomations.in/",
    },
    {
      title: "Visa Platform - Borderly Visa",
      description: [
        "Designed and implemented the data management layer for a comprehensive visa and blog web application.",
        "Structured and maintained Supabase database schemas to handle blog post creation, retrieval, and updates, as well as manage visa application data.",
        "Focused on efficient data modeling and secure access controls to support both public-facing content and administrative functionalities.",
      ],
      technologies: [
        "JavaScript",
        "Supabase",
        "Database Design",
        "Access Control",
      ],
      github: "https://github.com/aziyanck/borderly-visa",
      demo: "https://www.borderlyvisa.in/",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> ls -la projects/
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions with modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-card transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="terminal-text text-xl mb-2 group-hover:terminal-glow transition-all">
                      {project.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  <ul className="space-y-2">
                    {project.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="terminal-text mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-xs"
                    onClick={() => window.open(project.github, "_blank")}
                  >
                    <Github className="w-3 h-3" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-xs"
                    onClick={() => window.open(project.demo, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="code-comment">
            <span className="terminal-text">~$</span> More projects available on{" "}
            <a
              href="https://github.com/serabin1"
              className="terminal-text hover:terminal-glow transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

