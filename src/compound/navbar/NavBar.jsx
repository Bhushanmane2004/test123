import React, { useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';

function NavBar({ setShowLogin }) {  
  const [menu, setMenu] = useState('menu');

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' alt="logo" />
      <ul className='navbar-menu'>
        <li onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</li>
        <li onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</li>
        <li onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</li>
        <li onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</li>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="search icon" />
        <div className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="basket icon" />
          <div className='dot'></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign-In</button>
      </div>
    </div>
  );
}

export default NavBar;
