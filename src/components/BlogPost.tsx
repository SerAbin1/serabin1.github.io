import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { Helmet } from "react-helmet-async";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  content: string;
  onBack: () => void;
}

const BlogPost = ({
  title,
  description,
  date,
  content,
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
      <Helmet>
        <title>{title} - Abin Biju</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <article className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 sm:mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Blog</span>
        </button>

        <header className="mb-8 sm:mb-12">
          <time className="text-sm text-muted-foreground font-mono tabular-nums mb-4 block">
            {formatDate(date)}
          </time>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </header>

        <div className="prose-container">
          <MarkdownRenderer content={content} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
