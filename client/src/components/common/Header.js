import React from 'react';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <h1>Montessori Home</h1>
          <p className='tagline'>Bringing Montessori to Your Home</p>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;