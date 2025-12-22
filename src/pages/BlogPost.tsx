import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <article className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 sm:mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Blog</span>
        </Link>

        <header className="mb-8 sm:mb-12">
          <time className="text-sm text-muted-foreground font-mono tabular-nums mb-4 block">
            {formatDate(post.date)}
          </time>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose-container">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;