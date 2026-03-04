import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const slideshowProjects = [
    {
      name: "Pumato",
      url: "https://pumato.online/",
      image: "/projects/pumato.png",
      description: "A full-stack food delivery, laundry, and grocery platform serving 3 campuses and 10,000+ students. Engineered to run entirely on free-tier infrastructure while handling 300,000+ Firestore reads per month — a deliberate architectural challenge.",
      tags: ["NextJS", "Firebase", "Firestore", "Serverless"]
    },
    {
      name: "BorderlyVisa",
      url: "https://www.borderlyvisa.in/",
      image: "/projects/borderlyvisa.png",
      description: "A modern visa and tourism platform built for affordable, timely visa applications. Co-developed with a focus on SEO performance, clean information architecture, and a trustworthy user experience.",
      tags: ["React", "SEO", "Supabase"]
    },
    {
      name: "SayrTravels",
      url: "https://www.sayrtravels.in/",
      image: "/projects/sayrtravels.png",
      description: "A static site for a medical tourism company. Built with a clean, minimal UI that puts the content first — fast, lightweight, and polished.",
      tags: ["React", "Static", "Minimal UI"]
    }
  ];

  const experiences: {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    technologies: string[];
    hasProjects?: boolean;
  }[] = [
      {
        title: "Backend Developer Intern",
        company: "Evide.AI",
        period: "Present",
        location: "Remote",
        description: [
          "Building backend infrastructure for a bus tracking application",
          "Developing scalable APIs for real-time bus location data and route information",
          "Implementing efficient data processing systems for live tracking",
          "Designing robust database architecture for user and route management",
        ],
        technologies: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "Docker",
          "Real-time APIs",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "Freelance",
        period: "Jul 2025 - Present",
        location: "Remote",
        description: [
          "Designed and developed full-stack applications and websites for clients across various domains, working across different tech stacks including React, Next.js, and Node.js.",
          "Delivered projects deployed via Firebase, Supabase, and Render.",
          "Handled diverse scales: from high-traffic service platforms to SEO-optimized business sites and clean static builds — each tailored to the client's budget and goals."
        ],
        technologies: ["React", "Next.js", "Node.js", "Firebase", "Supabase", "Render"],
        hasProjects: true,
      },
      {
        title: "Backend Developer Intern",
        company: "IndusTech Automations",
        period: "March - July 2025",
        location: "Madurai",
        description: [
          "Engineered a full-stack business management platform, streamlining invoicing and analytics",
          "Led backend development, building REST APIs for dynamic invoice generation",
          "Implemented secure Role Based Access Control (RBAC) and authentication systems",
          "Collaborated on React.js frontend and dashboard to visualize key business metrics",
        ],
        technologies: ["Node.js", "Express.js", "React.js", "PostgreSQL", "RBAC", "JWT"],
      },
    ];

  // Modal handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideshowProjects.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slideshowProjects.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.touches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) handleNextSlide();
      else handlePrevSlide();
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // GSAP animations
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !header || !cardsContainer) return;

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

      // Cards animation
      const cards = cardsContainer.querySelectorAll("[data-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 80%",
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
    <section ref={sectionRef} id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> cat experience.log
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions and securing digital infrastructure
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div ref={cardsRef} className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                data-card
                className="bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="terminal-text text-xl">
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-foreground">
                        {exp.company} • {exp.location}
                      </CardDescription>
                    </div>
                    <div className="text-sm code-comment font-mono">
                      {exp.period}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="terminal-text mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* View Projects Link */}
                  {exp.hasProjects && (
                    <div className="pt-4 mt-4 border-t border-border/50 flex flex-col items-center sm:items-end">
                      <button
                        onClick={() => {
                          setCurrentSlide(0);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        View Projects
                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Project Slideshow Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-card border border-border shadow-2xl rounded-xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">

              <div
                className="relative pt-2 pb-6"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slideshowProjects.map((project, idx) => (
                      <div key={idx} className="w-full flex-shrink-0 px-2">
                        <div className="space-y-4">
                          <h4 className="text-lg md:text-xl font-semibold terminal-text">{project.name}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed min-h-[60px]">
                            {project.description}
                          </p>

                          <div className="rounded-lg border border-border overflow-hidden bg-background h-[180px] md:h-[220px] relative group flex items-center justify-center">
                            {failedImages[project.name] ? (
                              <div className="flex flex-col items-center justify-center w-full h-full bg-card/80 p-4 text-center">
                                <span className="font-semibold text-foreground mb-3">{project.name}</span>
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-5 py-2.5 rounded-md transition-colors"
                                >
                                  Visit Site <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={project.image}
                                  alt={`${project.name} Preview`}
                                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                                  loading="lazy"
                                  onError={() => setFailedImages((prev) => ({ ...prev, [project.name]: true }))}
                                />
                                {/* Desktop Hover Overlay */}
                                <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium bg-background text-foreground hover:bg-secondary px-5 py-2.5 rounded-md transition-all transform translate-y-4 group-hover:translate-y-0"
                                  >
                                    Visit Site <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Mobile Static Link (Hidden on Desktop) */}
                          {!failedImages[project.name] && (
                            <div className="md:hidden mt-3 mb-1">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2.5 rounded-md transition-colors"
                              >
                                Visit Site <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-[10px] md:text-xs bg-secondary text-secondary-foreground rounded-full font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute -left-2 top-[45%] md:-ml-4 p-2 bg-background hover:bg-secondary text-foreground rounded-full border border-border shadow-sm transition-all z-10 flex"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute -right-2 top-[45%] md:-mr-4 p-2 bg-background hover:bg-secondary text-foreground rounded-full border border-border shadow-sm transition-all z-10 flex"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-2">
                {slideshowProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-primary w-6" : "bg-muted w-1.5 md:w-2 hover:bg-muted-foreground"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;