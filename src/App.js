// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyList from './pages/PropertyList';
import ContactPage from './pages/ContactPage'; // Ensure you have this page
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Ensure you have this page */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
