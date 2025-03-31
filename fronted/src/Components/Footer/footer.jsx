import React from 'react'
import './footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">

                <img src={assets.logo} alt='' id='logo'/>
                <p>At Tanish food corner, we are committed to delivering fresh, flavorful, and sustainable food. Explore our recipes and culinary philosophy, and let us help you create memorable meals every day.</p>

                <div className="footer-social-logo">
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.facebook_icon} alt="" />
                </div>

            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>

                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>

                <ul>
                    <li>+91-95729-73654</li>
                    <li>tanish281202@gmail.com</li>
                    <li>https://github.com/Er-Rajnish-Kumar-Tiwari</li>
                    <li>http://www.linked.com/in/rajnish-kumar-tiwari-8661522b0</li>
                </ul>

            </div>

        </div>
        <hr/>
        <p style={{textAlign:"center"}} className="footer-copyright">Copyright 2025 © Tanish.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer