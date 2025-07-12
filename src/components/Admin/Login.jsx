import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </section>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '400px',
  margin: '0 auto',
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

export default Login;
