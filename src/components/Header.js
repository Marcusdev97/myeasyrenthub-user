// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
      {/* Left Side - Logo */}
      <div style={{ flex: '1' }}>
        {/* Sample Logo Image */}
        <img
          src="/path/to/sample-logo.png"
          alt="Logo"
          style={{ width: '127px', height: '56px', objectFit: 'contain' }}
        />
      </div>

      {/* Center - Navigation Links */}
      <nav style={{ flex: '2', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>主页</Link>
        <Link to="/properties" style={{ textDecoration: 'none', color: 'black' }}>房源</Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: 'black' }}>联络我们</Link>
      </nav>

      {/* Right Side - Empty for now */}
      <div style={{ flex: '1' }}>
        {/* Right side content goes here, if needed */}
      </div>
    </header>
  );
};

export default Header;
