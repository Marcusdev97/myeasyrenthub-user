// src/pages/PropertyDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetails.css';  // Import the CSS file

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // State to track selected image

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }

        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handlePrevClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="property-details-container">
          {/* Left section for images */}
          <div className="property-images-section">
            <div className="main-image-container">
              <img
                src={`${process.env.REACT_APP_API_URL}${property.images[selectedImage]}`}
                alt="Main Property"
                className="main-image"
              />
            </div>
            <div className="thumbnail-images-container">
              <button className="nav-button left" onClick={handlePrevClick}>
                <i className="fas fa-chevron-left"></i> {/* Font Awesome left chevron icon */}
              </button>
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API_URL}${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)} // Set the clicked thumbnail as the main image
                />
              ))}
              <button className="nav-button right" onClick={handleNextClick}>
                <i className="fas fa-chevron-right"></i> {/* Font Awesome right chevron icon */}
              </button>
            </div>
          </div>

      {/* Tabs section for additional information */}
      {/* <div className="property-tabs">
        <button className="tab active">房源简介</button>
        <button className="tab">租约信息</button>
        <button className="tab">室友信息</button>
        <button className="tab">小区简介</button>
        <button className="tab">周边配套</button>
      </div> */}
    </div>
  );
};

export default PropertyDetails;
