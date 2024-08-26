// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [properties, setProperties] = useState([]); // State to hold properties

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/properties" 
              element={<PropertyList setProperties={setProperties} />} // Pass the setProperties function
            />
            <Route 
              path="/properties/:id" 
              element={<PropertyDetails properties={properties} />} // Pass properties as a prop
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
