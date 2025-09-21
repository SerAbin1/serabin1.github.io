import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/components/AllBlogs";

const BlogPage = () => {
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
                    <Link to={`/blog/${post.slug}`}>
                      <Button className="flex items-center gap-2">
                        <span>Read Article</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
