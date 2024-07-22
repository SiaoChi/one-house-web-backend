import React from 'react';
import '../css/Home.css'

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="section">
          <h3>建立專案說明</h3>
          <ol>
            <li>手動將檔案丟到指定的s3資料夾。前端網頁會直接加入s3/CDN的domain</li>
            <li>建立檔案的圖片，請直接輸入檔案名稱</li>
            <li>由於專案desc by timestamp，建立時請以最舊的資料建立到最新資料。未來可以在開發手動建立日期對應timestamp較方便。</li>
          </ol>
        </div>
      </div>
      <p></p>
      <div className="container">
        <div className="section">
          <h3>使用語言與技術</h3>
          <ol>
            <li>Github Relio：One-house-web</li>
            <li>fronted：next.js</li>
            <li>Backend：AliI AWS lambda</li>
            <li>database：Firestore</li>
            <li>dashboard：Firestore + react + s3 + cloudfront + gh-liages</li>
          </ol>
        </div>
      </div>
    </>
  );
};


export default Home;

