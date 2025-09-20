import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Sockets or How Processes Communicate",
      description: "An introduction to socket programming, covering TCP/UDP protocols, client-server architecture, and inter-process communication fundamentals.",
      date: "2025-08-05",
      readTime: "8 min read",
      category: "Network Programming",
      link: "https://serabin1.github.io/blogs/",
      tags: ["Sockets", "TCP", "UDP", "System Programming"]
    },
    {
      title: "Building Secure REST APIs",
      description: "Best practices for implementing authentication, authorization, and security measures in modern web APIs.",
      date: "2025-07-20",
      readTime: "12 min read", 
      category: "Backend Development",
      link: "#",
      tags: ["REST API", "Security", "JWT", "RBAC"]
    },
    {
      title: "Database Security Fundamentals",
      description: "Essential security practices for database management, including access control, encryption, and vulnerability prevention.",
      date: "2025-07-10",
      readTime: "15 min read",
      category: "Cybersecurity",
      link: "#",
      tags: ["Database", "Security", "SQL Injection", "Encryption"]
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <section id="blogs" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> find ./blog -name "*.md"
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Technical Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge about backend development, cybersecurity, and system design
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-card transition-all duration-300 group">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded font-mono">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="terminal-text text-xl mb-2 group-hover:terminal-glow transition-all">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => window.open(post.link, '_blank')}
                    >
                      <span>Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blog CTA */}
          <div className="text-center mt-12 p-8 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <h3 className="text-xl font-bold terminal-text mb-4">
              Want to read more?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out my complete blog for more technical articles and tutorials
            </p>
            <Button
              onClick={() => window.open('https://serabin1.github.io/blogs/', '_blank')}
              className="font-mono"
            >
              visit_blog()
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;