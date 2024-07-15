// src/components/ManageProjects.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

import '../css/ManageProjects.css';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'one-house'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() });
          console.log(doc);
        });
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'one-house', projectId));
      setProjects(projects.filter(project => project.id !== projectId));
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const getYoutubeId = (url) => {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};



  return (
    <div className="manage-projects">
      <h1>管理專案</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3>{project.project}</h3>
            <p>category: {project.category}</p>
            <p>year: {project.year}</p>
            <p>date: {project.created_at}</p>
            <img src={project.hero_image} alt="專案主圖" />
            <ul className="image-list">
              {project.contents.map((content, index) => (
                <li key={index}>
                    {content.type === 'video' ? (
                      <iframe
                        width="280"
                        height="160"
                        src={`https://www.youtube.com/embed/${getYoutubeId(content.url)}`}
                        title={index}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img src={content.url} alt={index} />
                    )}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(project.id)}>刪除</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
