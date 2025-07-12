import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, slug, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <section><h2>Blog</h2><p>Loading posts...</p></section>;
  if (error) return <section><h2>Blog</h2><p>Error: {error}</p></section>;

  return (
    <section id="blog">
      <h2>Blog</h2>
      <div className="blog-posts">
        {posts.length === 0 ? (
          <p>No blog posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="blog-post-preview">
              <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Blog;
