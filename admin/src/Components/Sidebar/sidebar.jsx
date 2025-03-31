import React, { useState } from 'react'
import './sidebar.css';
import { assets } from '../../assets/admin_assets/assets';
import { NavLink } from 'react-router-dom';
import Menu from './menu.png'
import Cut from './cut.png'

const Sidebar = () => {
    const [icon, setIcon] = useState(false);
    return (
        <div className={`${icon ? "sidebar" : "falsesidebar"}`}>
            
            {icon ? <img onClick={() => setIcon(false)} src={Cut} className='menu' style={{width:"25px"}}/> : <img onClick={() => setIcon(true)} src={Menu} alt='' className='menu' />}

            {icon ?
                (
                    <div className="sidebar-options">
                        

                        <NavLink to='/add' className="sidebar-option">
                            <img src={assets.add_icon} alt="" />
                            <p>Add Items</p>
                        </NavLink>

                        <NavLink to='/list' className="sidebar-option">
                            <img src={assets.order_icon} alt="" />
                            <p>List Items</p>
                        </NavLink>
                        
                        <NavLink to='/menu' className="sidebar-option">
                            <img src={assets.add_icon} alt="" />
                            <p>Add Menu</p>
                        </NavLink>

                        <NavLink to='/menuList' className="sidebar-option">
                            <img src={assets.order_icon} alt="" />
                            <p>Menu List</p>
                        </NavLink>

                        <NavLink to='/orders' className="sidebar-option">
                            <img src={assets.order_icon} alt="" />
                            <p>Orders</p>
                        </NavLink>

                    </div>
                )
                : 
                (
                    <div />
                )
            }
        </div>
    )
}

export default Sidebar