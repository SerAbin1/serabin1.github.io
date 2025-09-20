import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "experience", "projects", "skills", "blogs"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "intro", label: "intro" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
    { id: "blogs", label: "blogs" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="terminal-text font-bold">
            <span className="code-keyword">$</span> abin-biju
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`terminal-text hover:bg-accent transition-colors ${
                  activeSection === item.id ? "bg-accent" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile menu - simplified */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="terminal-text">
              menu
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;