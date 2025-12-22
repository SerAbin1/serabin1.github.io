import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";

const Blog = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blogs" className="py-16 sm:py-20 bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <header className="mb-8 sm:mb-12">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            <span className="text-primary">$</span> cat ./blog/recent.md
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Recent Posts
          </h2>
        </header>

        <div className="space-y-1 mb-8">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="group block py-4 -mx-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <article className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <time className="text-sm text-muted-foreground font-mono shrink-0 tabular-nums">
                  {formatDate(post.date)}
                </time>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <Link
          to="/blogs"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-2"
        >
          View all posts
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default Blog;