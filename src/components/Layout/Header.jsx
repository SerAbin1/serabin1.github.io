import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1><Link to="/" style={linkStyle}>Abin's Portfolio</Link></h1>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}><a href="#about" style={linkStyle}>About</a></li>
          <li style={navItemStyle}><a href="#projects" style={linkStyle}>Projects</a></li>
          <li style={navItemStyle}><a href="#skills" style={linkStyle}>Skills</a></li>
          <li style={navItemStyle}><Link to="/blog" style={linkStyle}>Blog</Link></li>
          <li style={navItemStyle}><a href="#contact" style={linkStyle}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#000',
  padding: '20px',
  borderBottom: '1px solid #00ff00',
  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
};

const navItemStyle = {
  marginLeft: '20px',
};

const linkStyle = {
  color: '#00ff00',
  textDecoration: 'none',
  fontSize: '1.1em',
  textShadow: '0 0 5px rgba(0, 255, 0, 0.7)',
};

export default Header;
