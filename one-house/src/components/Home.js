// src/components/Home.js
import React from 'react';
// import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    textAlign: 'center' // 將容器內所有內容置中
  };

  const headingStyle = {
    marginBottom: '20px' // 標題下方留出一些間距
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>One-House 官網後台</h1>
      <p>Github Repo：One-house-web</p>
      <p>fronted：next.js</p>
      <p>Backend：API AWS lambda</p>
      <p>database：Firestore</p>
      <p>dashboard：Firestore + react + s3 + cloudfront</p>
    </div>
  );
};


export default Home;

