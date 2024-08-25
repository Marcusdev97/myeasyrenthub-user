// src/pages/PropertyList.js
import React, { useState, useEffect } from 'react';
import '../styles/PropertyList.css';

// Component to handle the property search with suggestions
const PropertySearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions] = useState(['SS13', 'SS15', 'CasaTiara', 'IconCity', 'Greenfield', 'GeoSense', 'GeoLake', 'Union', 'Edumetro']);

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
  };

  return (
    <div className="search-container">
      <h1>泰来租房帮手</h1>
      <input 
        type="text" 
        value={searchValue}
        placeholder="输入小区或商圈开始找房咯~" 
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input"
      />
      {/* Display search suggestions */}
      <div className="suggestions-container">
      <p class="suggestion-text">为您推荐的地区：</p>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="suggestion-button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('租房');

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`);
      if (!response.ok) {
        console.error('Response error:', response.status, response.statusText);
        setErrorMessage('加载房源失败，请稍后重试。');
        return;
      }

      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('获取房源时出错:', error);
      setErrorMessage('加载房源失败，请稍后重试。');
    }
  };

  const fetchAirbnb = () => {
    console.log("Fetching Airbnb data is not implemented yet.");
  };

  useEffect(() => {
    if (activeTab === '租房') {
      fetchProperties();
    }
  }, [activeTab]);

  const renderImages = (images) => {
    if (!images) return null;
    const imageArray = images.split(',').map(image => image.trim().replace(/[\[\]"]+/g, ''));
    const firstImage = imageArray[0];
    return (
      <div className="property-image-container">
        <img
          src={`${process.env.REACT_APP_API_URL}${firstImage}`}
          alt="房源图片"
          className="property-image"
        />
      </div>
    );
  };

  const formatAvailableDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    if (date.getFullYear() === now.getFullYear()) {
      if (date.getMonth() === now.getMonth()) {
        return `随时可入住`;
      } else {
        return `${monthNames[date.getMonth()]}房源`;
      }
    } else if (date.getFullYear() > now.getFullYear()) {
      return `明年${monthNames[date.getMonth()]}`;
    }
  };

  return (
    <div>
      {/* Include the search component */}
      <PropertySearch />

      {/* Navigation for 租房 and 民宿 */}
      <div className="navigation-bar">
        <button 
          onClick={() => setActiveTab('租房')} 
          className={activeTab === '租房' ? 'active-tab' : 'inactive-tab'}
        >
          租房
        </button>
        <button 
          onClick={fetchAirbnb} 
          className="disabled-tab"
          disabled
        >
          民宿
        </button>
      </div>

      {/* Property Listings */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="property-list">
        {properties.map(property => (
          <div key={property.id} className="property-item">
            {/* Property Image */}
            {renderImages(property.images)}
            
            {/* Property Details */}
            <div className="property-details">
                {/* Display the formatted available date */}
                <div className="available-date">
                  {formatAvailableDate(property.availableDate)}
                </div>
                <h3 className="property-title">{property.title}</h3>
                <p className="property-info">卧室: {property.rooms} | 浴室: {property.bathrooms}</p>
                <p className="property-description">{property.description}</p>
                {/* Display tags */}
                <div className="property-tags">
                  {property.tags && property.tags.split(';').map((tag, index) => (
                    <span key={index} className="property-tag">{tag}</span>
                  ))}
                </div>
                <p className="property-price">{property.price} 马币/月</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
