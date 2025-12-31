import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import GitHubActivity from "@/components/GitHubActivity";
import TechStack from "@/components/TechStack";
import PageTransition from "@/components/PageTransition";

import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <PageTransition>
      <Helmet>
        <link rel="canonical" href="https://serabin1.github.io/" />
      </Helmet>
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
    </PageTransition>
  );
};

export default Index;
