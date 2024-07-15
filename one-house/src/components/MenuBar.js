// src/components/MenuBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css'

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li>
          <Link to="/">首頁</Link>
        </li>
        <li>
          <Link to="/projects">管理專案</Link>
        </li>
        <li>
          <Link to="/create">建立專案</Link>
        </li>
                <li>
          <Link to="/one-house">導向主網頁</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
