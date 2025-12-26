import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

const Intro = () => {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = 'print("Hello, World!")'
  const containerRef = useRef<HTMLDivElement>(null)

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0
    const typeWriter = () => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
        setTimeout(typeWriter, 100)
      } else {
        setShowCursor(false)
      }
    }

    const timer = setTimeout(typeWriter, 800)
    return () => clearTimeout(timer)
  }, [])

  // GSAP intro animations
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    const codeBlock = container.querySelector("[data-animate='code']")
    const heading = container.querySelector("[data-animate='heading']")
    const description = container.querySelector("[data-animate='description']")
    const buttons = container.querySelector("[data-animate='buttons']")
    const terminal = container.querySelector("[data-animate='terminal']")

    // Set initial states
    gsap.set([codeBlock, heading, description, buttons, terminal], {
      opacity: 0,
      y: 40,
    })

    // Animate sequence with staggered timing
    tl.to(codeBlock, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      .to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .to(description, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .to(buttons, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
      .to(terminal, { opacity: 1, y: 0, duration: 0.5 }, 0.9)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="intro"
      className="flex items-center justify-center bg-background pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div
        ref={containerRef}
        className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
      >
        {/* Animated code line */}
        <div data-animate="code" className="mb-8 sm:mb-12">
          <pre className="text-lg sm:text-xl md:text-2xl font-mono">
            <span className="text-primary">print</span>
            <span className="text-foreground">(</span>
            <span className="text-green-400">
              "{displayText.includes('"') ? displayText.split('"')[1] : ""}"
            </span>
            <span className="text-foreground">)</span>
            {showCursor && <span className="terminal-cursor"></span>}
          </pre>
        </div>

        {/* Main heading */}
        <h1
          data-animate="heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6"
        >
          I'm Abin Biju.
        </h1>

        {/* Description */}
        <p
          data-animate="description"
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          Backend developer and cybersecurity enthusiast. Check out some of the
          stuff I've done and learned below.
        </p>

        {/* CTA */}
        <div
          data-animate="buttons"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() =>
              document
                .getElementById("experience")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            View Work
          </button>
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-2.5 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-medium"
          >
            See Projects
          </button>
        </div>

        {/* Terminal prompt */}
        <div
          data-animate="terminal"
          className="mt-12 sm:mt-16 text-left max-w-sm mx-auto font-mono text-sm"
        >
          <div className="text-muted-foreground">
            <span className="text-primary">~$</span> whoami
          </div>
          <div className="text-muted-foreground/80 ml-4 mt-1">
            Backend developer passionate about secure, scalable solutions
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
