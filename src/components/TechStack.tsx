import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TechStack.module.css";

gsap.registerPlugin(ScrollTrigger);

type TechItem = {
  name: string;
  logoUrl: string;
};

const techStackData: TechItem[] = [
  {
    name: "JavaScript",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Cpp",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "React",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Tailwind CSS",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg",
  },
  {
    name: "MongoDB",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-plain-wordmark.svg",
  },
  {
    name: "PostgeSQL",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg",
  },
  {
    name: "Docker",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const duplicatedTech = [...techStackData, ...techStackData];

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const carousel = carouselRef.current;

    if (!section || !header || !carousel) return;

    // Header animation
    gsap.fromTo(
      header.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Carousel fade in
    gsap.fromTo(
      carousel,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carousel,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="tech-stack" className="py-20">
      <div className="space-y-content-md">
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Tech Stack.
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              The stuff I use to build the stuff I build.
            </p>
          </div>
        </div>

        {/* Scrolling carousel */}
        <div ref={carouselRef} className="relative w-full overflow-hidden py-8">
          <div className={`flex items-center ${styles.scroller}`}>
            {duplicatedTech.map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-6 group"
              >
                <div className="relative w-12 h-12 transition-all duration-300 group-hover:scale-110 opacity-70 hover:opacity-100">
                  <img
                    alt={`${tech.name} logo`}
                    loading="lazy"
                    src={tech.logoUrl}
                    className="object-contain"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
