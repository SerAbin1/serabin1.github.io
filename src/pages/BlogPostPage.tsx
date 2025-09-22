import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import BlogPost from "@/components/BlogPost";
import NotFound from "./NotFound";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <BlogPost
      {...post}
      onBack={() => window.history.back()}
    />
  );
};

export default BlogPostPage;
