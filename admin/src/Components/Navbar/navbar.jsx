import React from 'react'
import './navbar.css';
import { assets } from '../../assets/admin_assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <h1 style={{color:"maroon"}}>Tanish Food Corner</h1>
        <img className='profile-logo' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar;