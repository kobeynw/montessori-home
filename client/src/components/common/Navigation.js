import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/activities" className="nav-link">Activities</Link>
        </li>
        <li className="nav-item">
          <Link to="/education" className="nav-link">Learn</Link>
        </li>
        <li className="nav-item">
          <Link to="/calendar" className="nav-link">My Calendar</Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
            <button onClick={onLogout} className="nav-link nav-link-logout">
              Logout
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link nav-link-login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;