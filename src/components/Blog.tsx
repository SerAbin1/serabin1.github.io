import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const recentPosts = blogPosts.slice(0, 3);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const posts = postsRef.current;
    const link = linkRef.current;

    if (!section || !header || !posts) return;

    // Header animation
    gsap.fromTo(
      header.children,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Blog posts animation
    const postItems = posts.querySelectorAll("[data-blog-post]");
    gsap.fromTo(
      postItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: posts,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // View all link animation
    if (link) {
      gsap.fromTo(
        link,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: link,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="py-16 sm:py-20 bg-background"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <header ref={headerRef} className="mb-8 sm:mb-12">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            <span className="text-primary">$</span> cat ./blog/recent.md
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Recent Posts
          </h2>
        </header>

        <div ref={postsRef} className="space-y-1 mb-8">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              data-blog-post
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
          ref={linkRef}
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