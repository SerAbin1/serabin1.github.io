import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  tags: string[];
  onBack: () => void;
  externalLink?: string;
}

const BlogPost = ({ 
  title, 
  description, 
  date, 
  readTime, 
  category, 
  content, 
  tags, 
  onBack,
  externalLink 
}: BlogPostProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          {/* Article header */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded font-mono">
                  {category}
                </span>
              </div>
              
              <CardTitle className="terminal-text text-2xl md:text-3xl mb-4 terminal-glow">
                {title}
              </CardTitle>
              
              <CardDescription className="text-muted-foreground text-lg leading-relaxed mb-6">
                {description}
              </CardDescription>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {externalLink && (
                <div className="mt-4">
                  <Button
                    onClick={() => window.open(externalLink, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <span>Read on External Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Article content */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <MarkdownRenderer content={content} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;