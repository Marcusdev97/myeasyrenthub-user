import React, { useEffect, useState } from 'react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    console.log('Fetching properties...');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`);
      console.log('Response received:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data);

        if (data && data.length > 0) {
          setProperties(data);
          setErrorMessage('');
        } else {
          setProperties([]);
          setErrorMessage('未找到任何房源。');
        }
      } else {
        setErrorMessage('无法加载房源。');
        console.error('Response error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('获取房源时出错:', error);
      setErrorMessage('加载房源失败，请稍后重试。');
    }
  };

  const renderImages = (images) => {
    if (!images) return null;
    
    const imageArray = images.split(',').map(image => image.trim().replace(/[\[\]"]+/g, '')); // Remove brackets and quotes

    return imageArray.map((imageSrc, index) => (
      <img
        key={index}
        src={`${process.env.REACT_APP_API_URL}${imageSrc}`}
        alt={`房源图片 ${index}`}
        style={{ maxWidth: '200px', margin: '10px' }}
      />
    ));
  };

  return (
    <div>
      <h1>欢迎来到易租屋</h1>
      {properties.map((property) => (
        <div key={property.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
          <div>{renderImages(property.images)}</div>
          <h2>{property.title}</h2>
          <p>价格: RM{property.price}</p>
          <p>卧室: {property.rooms}</p>
          <p>浴室: {property.bathrooms}</p>
          <p>描述: {property.description}</p>
          <p>可入住时间: {new Date(property.availableDate).toLocaleDateString('zh-CN')}</p>
          <p>{property.tags}</p>
        </div>
      ))}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>欢迎来到易租屋</h2>
    </div>
  );
};

export default PropertyList;
