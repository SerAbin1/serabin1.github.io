import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogsIndex = () => {
  const blogPosts = [
    {
      slug: "sockets-how-processes-communicate",
      title: "Sockets or How Processes Communicate",
      description: "An introduction to socket programming, covering TCP/UDP protocols, client-server architecture, and inter-process communication fundamentals.",
      date: "2025-08-05",
      readTime: "8 min read",
      category: "Network Programming",
      tags: ["Sockets", "TCP", "UDP", "System Programming"],
    },
    {
      slug: "building-secure-rest-apis",
      title: "Building Secure REST APIs",
      description: "Best practices for implementing authentication, authorization, and security measures in modern web APIs.",
      date: "2025-07-20",
      readTime: "12 min read", 
      category: "Backend Development",
      tags: ["REST API", "Security", "JWT", "RBAC"],
    },
    {
      slug: "database-security-fundamentals",
      title: "Database Security Fundamentals",
      description: "Essential security practices for database management, including access control, encryption, and vulnerability prevention.",
      date: "2025-07-10",
      readTime: "15 min read",
      category: "Cybersecurity",
      tags: ["Database", "Security", "SQL Injection", "Encryption"],
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-xl text-muted-foreground">
            Technical articles and tutorials on software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-muted px-2 py-1 rounded text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link to={`/blogs/${post.slug}`}>
                  <Button className="w-full group">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsIndex;