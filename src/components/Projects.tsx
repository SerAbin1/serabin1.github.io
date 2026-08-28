import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
        "Parser and stream decoder for the GT06 GPS tracker protocol over raw TCP",
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
    const list = listRef.current;

    if (!section || !header || !list) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      const items = list.querySelectorAll("[data-project-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

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
    <section ref={sectionRef} id="projects" className="py-16 sm:py-20 bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <header ref={headerRef} className="mb-8 sm:mb-12">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            <span className="text-primary">$</span> ls ./projects/
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Projects
          </h2>
        </header>

        <div ref={listRef} className="divide-y divide-border">
          {projects.map((project) => (
            <article
              key={project.title}
              data-project-item
              className="py-6 first:pt-0"
            >
              <h3 className="text-lg font-medium text-foreground">
                {project.title}
              </h3>

              <ul className="mt-2 space-y-1.5">
                {project.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs font-mono text-muted-foreground/80">
                {project.technologies.join(" · ")}
              </p>

              <div className="mt-3 flex items-center gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-2"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-2"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Demo
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          More projects on{" "}
          <a
            href="https://github.com/serabin1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-2"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
};

export default Projects;
