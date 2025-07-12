import React from 'react';

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Feel free to reach out to me via email or connect with me on social media.</p>
      <div style={contactLinksStyle}>
        <a href="mailto:your.email@example.com" style={linkStyle}>Email: your.email@example.com</a>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub: your-username</a>
        <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn: your-username</a>
      </div>
    </section>
  );
};

const contactLinksStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const linkStyle = {
  color: '#00ffff',
  textDecoration: 'none',
  fontSize: '1.1em',
};

export default Contact;
