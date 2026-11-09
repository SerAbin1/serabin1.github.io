export const projects = [
  {
    title: "gt06",
    description: ["Parser and stream decoder for the GT06 GPS tracker protocol over raw TCP"],
    technologies: ["Rust", "TCP", "Gt06", "GPS"],
    github: "https://github.com/SerAbin1/gt06",
    demo: "https://crates.io/crates/gt06",
  },
  {
    title: "Pumato",
    description: [
      "Full-stack food delivery, laundry, grocery, and rides platform serving 5,000+ campus students",
      "Runs entirely on free-tier infrastructure while serving 7k+ reads per day",
    ],
    technologies: ["Next.js", "Firebase", "Firestore", "TypeScript"],
    github: "https://github.com/SerAbin1/pumato",
    demo: "https://pumato.online",
  },
  {
    title: "rss-reader",
    description: [
      "RSS feed reader with mobile and web, sync via D1",
      "Core logic in Rust, reused across web and mobile via JNI and Wasm",
    ],
    technologies: ["Rust", "TypeScript", "Kotlin"],
    github: "https://github.com/SerAbin1/rss-reader",
    demo: "https://my-rss-reader.serabin1.workers.dev/",
  },
];
