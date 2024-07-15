// src/components/CreateProject.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../css/CreateProject.css'

const CreateProject = () => {
  const [formData, setFormData] = useState({
    category: 'Brand',
    project: '',
    created_at: '',
    timestamp: '',
    year: '',
    hero_image: '',
    contents: [{ type: 'jpeg', url: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hero_image') {
      setFormData({
        ...formData,
        [name]:  value,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (index, e) => {
    const { name, value } = e.target;
    const newContents = formData.contents.map((content, i) =>
      i === index ? { ...content, [name]:  value } : content
    );
    setFormData({
      ...formData,
      contents: newContents,
    });
  };

  const addContent = () => {
    setFormData({
      ...formData,
      contents: [...formData.contents, { type: 'jpeg', url: '' }],
    });
  };

  const removeContent = (index) => {
    const newContents = formData.contents.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      contents: newContents,
    });
  };

  const getCurrentTaiwanTime = () => {
    const now = new Date();
    // 台灣的時區偏移量是 UTC+8
    const taiwanOffset = 8 * 60; // 分鐘數
    const taiwanTime = new Date(now.getTime() + taiwanOffset * 60000); // 轉換為毫秒數
    return taiwanTime.toISOString();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // 獲取當前的台灣時間並設置給 created_at
      const taiwanTime = getCurrentTaiwanTime();
      console.log(taiwanTime);
      const timestamp = Math.floor(new Date().getTime() / 1000);


      formData.hero_image = setCdnDomain(formData.hero_image)

      formData.contents = formData.contents.map((content) => {
      if (content.type === 'jpg' || content.type === 'jpeg' || content.type === 'gif') {
        content.url = setCdnDomain(content.url); // 加入 CDN domain
      }
        return content; 
      });

      // 將 formData、taiwanTime 和 timestamp 一起添加到 Firestore
      await addDoc(collection(db, 'one-house'), { ...formData, created_at: taiwanTime, timestamp });
   
    
      // 提示用戶操作成功
      alert('專案已成功建立！');

      // 重置表單
      setFormData({
        category: 'Brand',
        project: '',
        created_at: '',
        timestamp: '',
        year: '',
        hero_image: '',
        contents: [{ type: 'jpeg', url: '' }],
      });

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const setCdnDomain = (url) => {
    const domain = 'https://dw3cmziadtv0r.cloudfront.net/one-house-web/projects/';
    return domain + url;
  };

  return (
    <div className="create-project">
      <h1>建立one-house專案</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>類別：</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="brand">Brand</option>
            <option value="photography">Photography</option>
            <option value="design">Design</option>
            <option value="video">Video</option>
            <option value="3D">3D</option>
            <option value="exhibition">Exhibition</option>
          </select>
        </div>
        <div>
          <label>專案名稱：</label>
          <input type="text" name="project" value={formData.project} onChange={handleChange} />
        </div>
        <div>
          <label>作品年份：</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} />
        </div>
        <div>
          <label>首頁圖像：</label>
          <input type="text" name="hero_image" value={formData.hero_image} onChange={handleChange} />
        </div>
        <div className="contents">
          <h3>內容</h3>
          {formData.contents.map((content, index) => (
            <div key={index} className="content-item">
              <select name="type" value={content.type} onChange={(e) => handleContentChange(index, e)}>
                <option value="jpg">JPG</option>
                <option value="video">Video</option>
                <option value="png">PNG</option>
                <option value="gif">GIF</option>
              </select>
              <input
                type="text"
                name="url"
                placeholder="File Name in S3"
                value={content.url}
                onChange={(e) => handleContentChange(index, e)}
              />
              <button type="button" onClick={() => removeContent(index)}>刪除</button>
            </div>
          ))}
          <button type="button" className="add-content" onClick={addContent}>增加內容</button>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default CreateProject;