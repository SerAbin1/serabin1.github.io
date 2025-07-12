import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Admin = () => {
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update({ title, slug: newSlug, content })
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('posts')
          .insert({ title, slug: newSlug, content });
        if (error) throw error;
      }
      setTitle('');
      setSlug('');
      setContent('');
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <section><h2>Loading...</h2></section>;
  if (!session) {
    navigate('/login');
    return null;
  }

  return (
    <section id="admin">
      <h2>Admin Panel</h2>
      <button onClick={handleLogout} disabled={loading} style={buttonStyle}>Logout</button>

      <h3>{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
      <form onSubmit={handleSavePost} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="title" style={labelStyle}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="slug" style={labelStyle}>Slug (optional):</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="content" style={labelStyle}>Content (Markdown):</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="15"
            style={{ ...inputStyle, minHeight: '200px' }}
          ></textarea>
        </div>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
        </button>
        {editingPost && (
          <button type="button" onClick={() => { setEditingPost(null); setTitle(''); setSlug(''); setContent(''); }} style={{ ...buttonStyle, backgroundColor: '#555', marginLeft: '10px' }}>
            Cancel Edit
          </button>
        )}
        {error && <p style={errorStyle}>{error}</p>}
      </form>

      <h3>Existing Posts</h3>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul style={postListStyle}>
          {posts.map((post) => (
            <li key={post.id} style={postListItemStyle}>
              <span>{post.title}</span>
              <div>
                <button onClick={() => handleEdit(post)} disabled={loading} style={buttonStyle}>Edit</button>
                <button onClick={() => handleDelete(post.id)} disabled={loading} style={{ ...buttonStyle, backgroundColor: '#ff0000', marginLeft: '10px' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #00ff00',
  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
  backgroundColor: '#2a2a2a',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '5px',
  color: '#00ff00',
};

const inputStyle = {
  padding: '10px',
  backgroundColor: '#1a1a1a',
  border: '1px solid #00ff00',
  color: '#00ff00',
  fontFamily: 'monospace',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#00ff00',
  color: '#1a1a1a',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1em',
  fontFamily: 'monospace',
};

const errorStyle = {
  color: '#ff0000',
  textAlign: 'center',
};

const postListStyle = {
  listStyle: 'none',
  padding: 0,
};

const postListItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #00ff00',
  marginBottom: '10px',
  backgroundColor: '#2a2a2a',
};

export default Admin;
