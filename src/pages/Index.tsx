import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import GitHubActivity from "@/components/GitHubActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <GitHubActivity /> 
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
