// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import ManageProjects from './ManageProjects';
import CreateProject from './CreateProject';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ManageProjects />} />
          <Route path="/create" element={<CreateProject />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
