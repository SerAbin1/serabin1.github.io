// src/components/TechStack.tsx

import React from "react"
import styles from "./TechStack.module.css" // Import our local CSS
import Certifications from "./Certifications"

// Define a type for our tech stack data for type safety
type TechItem = {
  name: string
  logoUrl: string
}

// All the technologies are stored in this array. Easy to update!
const techStackData: TechItem[] = [
  {
    name: "Python",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "TypeScript",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
  },
  {
    name: "Tailwind CSS",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
  },
  {
    name: "Flask",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "MySQL",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
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
  {
    name: "PyTorch",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "TensorFlow",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
]

const TechStack = () => {
  // To create the infinite scroll effect, we duplicate the array of logos
  const duplicatedTech = [...techStackData, ...techStackData]

  return (
    <section id="tech-stack" className="mb-section-lg">
      <div className="space-y-content-md">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Tech Stack.
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              The stuff I use to build the stuff I build.
            </p>
          </div>
        </div>

        {/* This is the main container for the scrolling carousel */}
        <div className="relative w-full overflow-hidden py-8">
          {/* This div holds the logos and has the animation class applied */}
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

        {/* Certifications Button */}
        <div className="flex justify-center">
          <Certifications />
        </div>
      </div>
    </section>
  )
}

export default TechStack
