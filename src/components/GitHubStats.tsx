import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, GitBranch, Star } from "lucide-react";

const GitHubStats = () => {
  const username = "SerAbin1";
  const statsUrl = `https://github-readme-stats-mauve-beta-15.vercel.app/api?username=${username}&show_icons=true&theme=chartreuse-dark&bg_color=1a1b23&title_color=00ff00&text_color=ccffcc&icon_color=00ff00&border_color=333333`;
  const topLangsUrl = `https://github-readme-stats-mauve-beta-15.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=chartreuse-dark&bg_color=1a1b23&title_color=00ff00&text_color=ccffcc&border_color=333333`;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> curl -s https://api.github.com/users/{username}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            GitHub Statistics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into my development activity and programming language usage
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GitHub Stats Card */}
            <Card className="bg-card border-border hover:shadow-card transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 terminal-text">
                  <Github className="w-5 h-5" />
                  <span>Overall Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-card/50 rounded-lg p-4 border border-border">
                  <img
                    src={statsUrl}
                    alt="GitHub Stats"
                    className="w-full h-auto rounded border border-terminal-green/20"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Languages Card */}
            <Card className="bg-card border-border hover:shadow-card transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 terminal-text">
                  <GitBranch className="w-5 h-5" />
                  <span>Top Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-card/50 rounded-lg p-4 border border-border">
                  <img
                    src={topLangsUrl}
                    alt="Top Languages"
                    className="w-full h-auto rounded border border-terminal-green/20"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* GitHub Profile Link */}
          <div className="text-center mt-8">
            <Card className="bg-card/30 backdrop-blur-sm border-border inline-block">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Github className="w-6 h-6 text-terminal-green" />
                  <span className="terminal-text font-mono">
                    github.com/{username}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Check out my repositories and contributions
                </p>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-green text-background rounded font-mono text-sm hover:bg-terminal-green-bright transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Visit Profile
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;