import Intro from "@/components/Intro"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"

import Blog from "@/components/Blog"
import Footer from "@/components/Footer"
import GitHubActivity from "@/components/GitHubActivity"
import TechStack from "@/components/TechStack"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Intro />
        <Experience />
        <Projects />
        <TechStack />
        <GitHubActivity />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}

export default Index
