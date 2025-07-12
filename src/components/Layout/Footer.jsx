import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Abin. All rights reserved.</p>
      <div style={socialLinksStyle}>
        <a href="mailto:your.email@example.com" style={linkStyle}>Email</a>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>
        <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#000',
  padding: '20px',
  borderTop: '1px solid #00ff00',
  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
  textAlign: 'center',
  marginTop: 'auto',
  color: '#00ff00',
};

const socialLinksStyle = {
  marginTop: '10px',
};

const linkStyle = {
  color: '#00ffff',
  textDecoration: 'none',
  margin: '0 10px',
};

export default Footer;
