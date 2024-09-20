import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PropertyList.css';
import '../fontawesome-free-6.6.0-web/css/all.min.css'; // Adjust the path as needed based on your file structure

// Component to handle the property search with suggestions
const PropertySearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions] = useState(['SS13', 'SS15', 'CasaTiara', 'IconCity', 'Greenfield', 'GeoSense', 'GeoLake', 'Union', 'Edumetro']);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    onSearch(suggestion); // Trigger the search action in the parent component
  };

  // Handle 'Enter' key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchValue); // Trigger search action when Enter is pressed
    }
  };

  return (
    <div className="search-container">
      <h1>泰来租房帮手</h1>
      <input
        type="text"
        value={searchValue}
        placeholder="输入小区或商圈开始找房咯~"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown} // Listen for Enter key
        className="search-input"
      />
      {/* Display search suggestions */}
      <div className="suggestions-container">
        <p className="suggestion-text">为您推荐的地区：</p>
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
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('租房');
  const [searchValue, setSearchValue] = useState(''); // To store the selected search value
  const navigate = useNavigate(); // For programmatic navigation

  // Handle property item click
  const handlePropertyClick = (id) => {
    navigate(`/properties/${id}`);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`);
        if (!response.ok) {
          console.error('Response error:', response.status, response.statusText);
          setErrorMessage('加载房源失败，请稍后重试。');
          return;
        }

        const data = await response.json();
        setProperties(data); // Set all properties
        setFilteredProperties(data); // Initially display all properties
      } catch (error) {
        console.error('获取房源时出错:', error);
        setErrorMessage('加载房源失败，请稍后重试。');
      }
    };

    if (activeTab === '租房') {
      fetchProperties();
    }
  }, [activeTab]);

  // Filter properties whenever searchValue changes
  useEffect(() => {
    if (searchValue) {
      const filtered = properties.filter((property) =>
        property.location.toLowerCase() === searchValue.toLowerCase() // Ensure case-insensitive match
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties); // If no search value, display all properties
    }
  }, [searchValue, properties]);

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
      <PropertySearch onSearch={setSearchValue} />

      {/* Navigation for 租房 and 民宿 */}
      <div className="navigation-bar">
        <button 
          onClick={() => setActiveTab('租房')} 
          className={activeTab === '租房' ? 'active-tab' : 'inactive-tab'}
        >
          租房
        </button>
        <button 
          onClick={() => console.log('Fetching Airbnb data is not implemented yet.')} 
          className="disabled-tab"
          disabled
        >
          民宿
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Check if filtered properties are empty */}
      {filteredProperties.length === 0 && searchValue ? (
        <div className="no-results-message">不好意思，目前已经没有这区的单位了</div>
      ) : (
        <div className="property-list">
          {filteredProperties.map(property => (
            <div key={property.id} className="property-item" onClick={() => handlePropertyClick(property.id)}>
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
      )}
    </div>
  );
};

export default PropertyList;
