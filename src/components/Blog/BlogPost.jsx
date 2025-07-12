import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, created_at')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) return <section><h2>Loading post...</h2></section>;
  if (error) return <section><h2>Error: {error}</h2></section>;
  if (!post) return <section><h2>Post not found.</h2></section>;

  return (
    <section>
      <h2>{post.title}</h2>
      <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
      <div className="blog-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </section>
  );
};

export default BlogPost;