const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          {/* Terminal-style footer */}
          <div className="font-mono text-sm code-comment">
            <div>
              <span className="terminal-text">~$</span> echo "Thanks for
              visiting!"
            </div>
            <div className="mt-2">
              <span className="code-keyword">const</span> contact = {"{"}
            </div>
            <div className="ml-4">
              <span className="code-string">"email"</span>:{" "}
              <span className="code-string">"sonuabin7@gmail.com"</span>,
            </div>
            <div className="ml-4">
              <span className="code-string">"github"</span>:{" "}
              <span className="code-string">"SerAbin1"</span>,
            </div>
            <div className="ml-4">
              <span className="code-string">"linkedin"</span>:{" "}
              <span className="code-string">"abin-biju7"</span>
            </div>
            <div>{"}"}</div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="https://github.com/serabin1"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text hover:terminal-glow transition-all"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/abin-biju7"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text hover:terminal-glow transition-all"
            >
              LinkedIn
            </a>
            <a
              href="https://serabin1.github.io/blogs/"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text hover:terminal-glow transition-all"
            >
              Blog
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border text-xs text-muted-foreground font-mono">
            <span className="code-comment">
              // Copyright © {currentYear} Abin Biju. Built with React &
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
