import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
}: BlogPostProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <article className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 sm:mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Blog</span>
        </button>

        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-4">
            <time className="font-mono tabular-nums">{formatDate(date)}</time>
            <span className="hidden sm:inline">·</span>
            <span>{readTime}</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-primary/80">{category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose-container">
          <MarkdownRenderer content={content} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
