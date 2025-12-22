import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogsIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 sm:mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back</span>
        </Link>

        <header className="mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Technical articles on backend development, security, and systems.
          </p>
        </header>

        <div className="space-y-1">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="group block py-4 sm:py-5 -mx-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <article className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <time className="text-sm text-muted-foreground font-mono shrink-0 tabular-nums">
                  {formatDate(post.date)}
                </time>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </article>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogsIndex;