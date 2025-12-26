import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: "GitHub", href: "https://github.com/serabin1" },
    { label: "LinkedIn", href: "https://linkedin.com/in/abin-biju7" },
    { label: "Mail", href: "mailto:sonuabin7@gmail.com" },
  ];

  // GSAP animation
  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-8 sm:py-12 bg-background border-t border-border"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div
          ref={contentRef}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Abin Biju
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
