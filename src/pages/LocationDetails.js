// src/components/LocationDetails.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LocationDetails.css';
import sampleImage from '../images/600x400.png';

function LocationDetails() {
  // Static location data including image, name, and description
  const locations = [
    {
      name: 'SS15',
      description: 'SS15 是一个著名的学生聚集区，靠近购物中心和餐馆，生活便利，交通方便。',
      image: sampleImage,
    },
    {
      name: 'SS13',
      description: 'SS13 靠近多个大学，环境安静，非常适合学生和工作人士。',
      image: sampleImage,
    },
    {
      name: 'Casa Tiara',
      description: 'Casa Tiara 是一个非常受欢迎的公寓，设施完善，房租合理。',
      image: sampleImage,
    },
    {
      name: 'Icon City',
      description: 'Icon City 是一个现代化的居住区，配有高端设施和购物中心。',
      image: sampleImage,
    },
    {
      name: 'Greenfield',
      description: 'Greenfield 提供宽敞的居住空间，周围环境绿意盎然，非常适合家庭居住。',
      image: sampleImage,
    },
    {
      name: 'Geosense',
      description: 'Geosense 是一个非常安静和安全的居住区，靠近主要大学。',
      image: sampleImage,
    },
    {
      name: 'Geolake',
      description: 'Geolake 是一个湖景社区，景色优美，生活设施齐全。',
      image: sampleImage,
    },
    {
      name: 'Union & Edumetro',
      description: 'Union 和 Edumetro 是现代化公寓楼，提供完善的设施，特别适合学生。',
      image: sampleImage,
    },
  ];

  return (
    <div className="location-info-page">
      <h1>地区介绍</h1>
      {locations.map((location, index) => (
        <div key={index} className="location-card">
          <div className="image-container">
            <img src={location.image} alt={location.name} className="location-image" />
          </div>
          <div className="location-description">
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            <Link to={`/properties?search=${location.name}`} className="navigation-link">
              查看房源
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationDetails;
