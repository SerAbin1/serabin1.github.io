import { useEffect, useState } from "react";

const Intro = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'print("Hello, World!")';

  useEffect(() => {
    let currentIndex = 0;
    const typeWriter = () => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeWriter, 100);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="min-h-screen flex items-center justify-center bg-gradient-terminal">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Animated code line */}
        <div className="mb-12">
          <pre className="text-2xl md:text-4xl font-mono terminal-glow">
            <span className="code-keyword">print</span>
            <span className="text-foreground">(</span>
            <span className="code-string">"{displayText.includes('"') ? displayText.split('"')[1] : ''}"</span>
            <span className="text-foreground">)</span>
            {showCursor && <span className="terminal-cursor"></span>}
          </pre>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 terminal-glow">
          I'm Abin Biju.
        </h1>

        {/* Description */}
        <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          <span className="code-comment"># Backend developer and cybersecurity enthusiast.</span>
          <br />
          <span className="code-comment"># Do check out some of the stuff I've done and learned down below</span>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:shadow-glow transition-all duration-300 font-mono"
          >
            explore_work()
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-mono"
          >
            view_projects()
          </button>
        </div>

        {/* Terminal prompt */}
        <div className="mt-16 text-left max-w-md mx-auto">
          <div className="code-comment text-sm">
            <span className="terminal-text">~$</span> whoami
          </div>
          <div className="text-muted-foreground ml-4 text-sm">
            Backend developer passionate about secure, scalable solutions
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;