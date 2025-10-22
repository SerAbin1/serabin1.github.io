import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  externalLink,
}: BlogPostProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

