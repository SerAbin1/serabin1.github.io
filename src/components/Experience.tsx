import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const experiences: {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    technologies: string[];
  }[] = [
    {
      title: "Backend Developer Intern",
      company: "Evide.AI",
      period: "Present",
      location: "Remote",
      description: [
        "Building backend infrastructure for a bus tracking application",
        "Developing scalable APIs for real-time bus location and route data",
      ],
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Real-time APIs"],
    },
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "Jul 2025 - Present",
      location: "Remote",
      description: [
        "Designed and developed full-stack applications for clients across various domains",
        "Delivered projects deployed via Firebase, Supabase, and Render",
      ],
      technologies: ["React", "Next.js", "Node.js", "Firebase", "Supabase", "Render"],
    },
    {
      title: "Backend Developer Intern",
      company: "IndusTech Automations",
      period: "March - July 2025",
      location: "Madurai",
      description: [
        "Engineered a full-stack business management platform for invoicing and analytics",
        "Implemented secure Role Based Access Control (RBAC) and authentication systems",
      ],
      technologies: ["Node.js", "Express.js", "React.js", "PostgreSQL", "RBAC", "JWT"],
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

      const items = list.querySelectorAll("[data-experience-item]");
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

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-16 sm:py-20 bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <header ref={headerRef} className="mb-8 sm:mb-12">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            <span className="text-primary">$</span> cat ./experience.log
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Experience
          </h2>
        </header>

        <div ref={listRef} className="divide-y divide-border">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.period}`}
              data-experience-item
              className="py-6 first:pt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg font-medium text-foreground">
                  {exp.title} <span className="text-muted-foreground">· {exp.company}</span>
                </h3>
                <time className="text-sm text-muted-foreground font-mono shrink-0 tabular-nums">
                  {exp.period}
                </time>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{exp.location}</p>

              <ul className="space-y-1.5">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs font-mono text-muted-foreground/80">
                {exp.technologies.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
