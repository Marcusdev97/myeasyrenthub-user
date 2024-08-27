// src/pages/PropertyDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetails.css'; // Import the CSS file

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

  const propertyLocationDescriptions = {
    SS13: "SS13 is a vibrant residential area with easy access to public transport and various amenities.",
    SS15: "SS15 offers a mix of residential and commercial spaces, known for its cafes and educational institutions.",
    CasaTiara: "CasaTiara is a luxury condominium located in the heart of the city, offering excellent facilities.",
    IconCity: "IconCity is a modern development that combines residential, office, and retail spaces.",
    Greenfield: "Greenfield is a serene neighborhood with plenty of parks and green spaces, ideal for families.",
    GeoSense: "GeoSense is a tech-centric area with state-of-the-art infrastructure and connectivity.",
    GeoLake: "GeoLake offers beautiful lake views and a tranquil environment, perfect for relaxation.",
    Union: "Union is a bustling area with diverse cultures and a wide variety of restaurants and shops.",
    Edumetro: "Edumetro is a student-friendly area with close proximity to major educational institutions."
  };

  const handlePrevClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  const locationDescription = propertyLocationDescriptions[property.location] || "No description available for this location.";

    // Calculate the lease end date by adding one year to the available date
    const availableDate = new Date(property.availableDate);
    const leaseEndDate = new Date(availableDate);
    leaseEndDate.setFullYear(availableDate.getFullYear() + 1);

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

      {/* Right section for details */}
      <div className="property-info-section">
        <h1 className="property-title">{property.title || "Property Title"}</h1>
        <p className="property-price">{property.price || "Price Not Available"} 马币/月</p>
        <p className="property-description">{property.description || "没有什么要求"}</p>

        <div className="property-tags">
          {property.tags ? property.tags.split(';').map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          )) : <span className="tag">没任何标签</span>}
        </div>

        <div className="property-key-info">
          <div className="key-info-item">
            <p className="key-value">{property.rooms || 0}室 {property.bathrooms || 0}卫</p>
            <p className="key-label">户型</p>
          </div>
          <div className="key-info-item">
            <p className="key-value">{property.area || 0}m²</p>
            <p className="key-label">面积</p>
          </div>
        </div>

        <div className="property-description-container">
          <h2 className="property-section-title">房源简介</h2>
          <p className="property-location-description">
            {locationDescription}
          </p>
        </div>
      </div>

      <div className="lease-info-section">
      <h2 className="lease-info-title">租约信息</h2>
      <div className="lease-info-content">
        <div className="lease-info-row">
          <span className="lease-info-label">可入住日期</span>
          <span className="lease-info-value">{availableDate.toLocaleDateString()}</span>
        </div>
        <div className="lease-info-row">
          <span className="lease-info-label">签约时长</span>
          <span className="lease-info-value">可长租1年 | 可签约至 {leaseEndDate.toLocaleDateString()}</span>
        </div>
        <div className="lease-info-row">
          <span className="lease-info-label">注意事项</span>
          <span className="lease-info-value"><a href="#">租房合同签订步骤</a></span>
        </div>
      </div>
      </div>

      {/* New Section for QR Code and Agent Information */}
      <div className="agent-info-section">
        <div className="agent-info">
          <img src="agent-profile-picture-url" alt="Agent Profile" className="agent-photo" />
          <div className="agent-details">
            <h3>刘艺博</h3>
            <p>微信扫一扫直接咨询</p>
          </div>
        </div>
        <div className="qr-code">
          <img src="qr-code-url" alt="QR Code" className="qr-code-image" />
        </div>
      </div>

      {/* New Section for Project Description */}
      <div className="project-description"></div>
  </div>

  );
};

export default PropertyDetails;
