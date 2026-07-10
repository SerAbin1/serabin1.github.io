import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const projects: {
    title: string;
    description: string[];
    technologies: string[];
    github: string;
    demo: string;
  }[] = [
    {
      title: "gt06",
      description: [
        "Parser and stream decoder for the GT06 GPS tracker protocol",
        "Handles login, location, status, and alarm messages over raw TCP",
        "Includes a Decoder that reassembles messages from a byte stream, buffering partial reads",
        "Published on crates.io — 882 lines of Rust, MIT licensed",
      ],
      technologies: ["Rust", "TCP", "Protocol Parser", "GPS", "crates.io"],
      github: "https://github.com/SerAbin1/gt06",
      demo: "https://crates.io/crates/gt06",
    },
    {
      title: "Pumato",
      description: [
        "Full-stack food delivery, laundry, and grocery platform serving 5,000+ campus students",
        "Built with Next.js and Firebase — handles orders, delivery tracking, and partner management",
        "Includes a student marketplace for buying, selling, and trading",
        "Runs entirely on free-tier infrastructure while serving 7k+ reads per day",
      ],
      technologies: ["Next.js", "Firebase", "Firestore", "JavaScript", "Playwright"],
      github: "https://github.com/SerAbin1/pumato",
      demo: "https://pumato.online",
    },
  ];

  // GSAP animations
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const footer = footerRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Project cards animation
      const cards = grid.querySelectorAll("[data-project-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Footer link animation
      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    // Refresh triggers once layout shifts settle
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (sectionRef.current) {
      resizeObserver.observe(document.body);
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> ls -la projects/
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learning by Building
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <Card
              key={index}
              data-project-card
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
                <div className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                  <ul className="space-y-2">
                    {project.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="terminal-text mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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

        <div ref={footerRef} className="text-center mt-12">
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
