import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import BlogPost from "@/components/BlogPost";
import NotFound from "./NotFound";
import PageTransition from "@/components/PageTransition";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <PageTransition>
      <BlogPost {...post} onBack={() => window.history.back()} />
    </PageTransition>
  );
};

export default BlogPostPage;
