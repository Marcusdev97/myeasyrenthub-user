import React from 'react';
import '../styles/LocationDetails.css'; // 可以为这个页面创建单独的样式文件

function LocationDetails() {
  // Example of static location data; in the future, this could come from props or state
  const locations = [
    { name: '地区 A', description: '地区 A 是靠近泰来大学的一个热门租房区域，房源丰富，价格适中，交通方便。' },
    { name: '地区 B', description: '地区 B 环境安静，适合喜欢安静生活的学生和上班族，房租相对较低。' },
    // Add more locations here
  ];

  return (
    <div className="location-info-page">
      <h1>地区介绍</h1>
      <p>这里是关于泰来大学附近各个地区的详细介绍。您可以根据每个地区的房源价格和环境选择合适的居住地。</p>

      {/* Render each location */}
      {locations.map((location, index) => (
        <div key={index} className="location-item">
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      ))}
    </div>
  );
}

export default LocationDetails;
