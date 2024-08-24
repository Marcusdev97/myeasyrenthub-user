// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyList from './pages/PropertyList';
import ServicePage from './pages/ServicePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property" element={<PropertyList />} /> {/* Ensure this route is present */}
        <Route path="/services" element={<ServicePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
