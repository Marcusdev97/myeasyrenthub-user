import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Get current route

  return (
    <header style={headerStyle}>
      {/* Left Side - Logo */}
      <div style={{ flex: '1' }}>
        <img
          src="/path/to/sample-logo.png"
          alt="Logo"
          style={{ width: '127px', height: '56px', objectFit: 'contain' }}
        />
      </div>

      {/* Right Side - Navigation Links */}
      <nav style={navStyle}>
        <Link
          to="/"
          style={{ ...linkStyle, borderBottom: location.pathname === '/' ? '3px solid #1a73e8' : 'none' }}
        >
          主页
        </Link>
        <Link
          to="/properties"
          style={{ ...linkStyle, borderBottom: location.pathname === '/properties' ? '3px solid #1a73e8' : 'none' }}
        >
          房源
        </Link>
        {/* Uncomment if needed */}
        {/* <Link
          to="/contact"
          style={{ ...linkStyle, borderBottom: location.pathname === '/contact' ? '3px solid #1a73e8' : 'none' }}
        >
          联络我们
        </Link> */}
      </nav>
    </header>
  );
};

// Styles
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  borderBottom: '1px solid #ddd',
};

const navStyle = {
  flex: '2',
  display: 'flex',
  justifyContent: 'flex-end', // Align right
  gap: '30px', // Space between items
};

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '16px',
  fontWeight: 'bold',
  paddingBottom: '10px',
  transition: 'border-bottom 0.3s ease',
};

export default Header;
