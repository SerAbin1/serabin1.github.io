const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: "https://github.com/serabin1" },
    { label: "LinkedIn", href: "https://linkedin.com/in/abin-biju7" },
    { label: "Mail", href: "mailto:sonuabin7@gmail.com" },
  ];

  return (
    <footer className="py-8 sm:py-12 bg-background border-t border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
