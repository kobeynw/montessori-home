import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Montessori Home</h1>
          <p className="tagline">Bringing Montessori to Your Home</p>
        </div>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;