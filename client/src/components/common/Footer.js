import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h3>Resources</h3>
          <ul className='footer-links'>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
            <li><a href='/donate'>Donate</a></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h3>Donate</h3>
          <p className='footer-links'>
            Montessori Home is a free website built and maintained so everyone can enjoy without fees, subscriptions, or
             ads! If you want to help support this, please consider <a href='/donate'>donating</a>.
          </p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>Workman Software™</p>
      </div>
    </footer>
  )
}

export default Footer;