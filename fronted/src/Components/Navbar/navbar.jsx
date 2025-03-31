import React, { useContext, useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/storeContext';
import { toast } from 'react-toastify';

function Navbar({ setShowLogin }) {
  const [menu, setmenu] = useState("Home");
  const { getTotalAmount, token, setToken, food_list,nsearch,setSearch ,filteredItems, setFilteredItems} = useContext(StoreContext);
  const navigate = useNavigate();
  const [noResults, setNoResults] = useState(false);  

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout successfully!");
    navigate("/");
  };

  const searchHandler = () => {
    const filtered = food_list.filter(item => item.name.toLowerCase().includes(nsearch.toLowerCase())); 
    setFilteredItems(filtered);
    setNoResults(filtered.length === 0); 
    toast.success("Iteam Find!...");
    console.log(filteredItems);
  };

  return (
    <div className='Navbar'>
      <Link onClick={() => setmenu("Home")} to='/'><img src={assets.logo} className='logo' alt='Logo'></img></Link>

      <ul className="Navbar-menu">
        <Link to='/' onClick={() => setmenu("Home")} className={menu === 'Home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setmenu("Menu")} className={menu === 'Menu' ? 'active' : ''}>Menu</a>
        <a href='#mobaile-app' onClick={() => setmenu("Mobaile-App")} className={menu === 'Mobaile-App' ? 'active' : ''}>Mobile-App</a>
        <a href='#footer' onClick={() => setmenu("Contact-Us")} className={menu === 'Contact-Us' ? 'active' : ''}>Contact-Us</a>
      </ul>

      <div className="Navbar-right">
        <input 
          type='text' 
          placeholder='Enter food-item name' 
          className='fsearch' 
          value={nsearch} 
          onChange={(e) => setSearch(e.target.value)} 
          name='nsearch'
        />
        <img 
          style={{ cursor: "pointer" }} 
          src={assets.search_icon} 
          alt='Search_Icon' 
          onClick={searchHandler} 
        />

        <div className="Search-icon">
          <Link onClick={() => setmenu("new")} to='/cart'><img src={assets.bag_icon} alt='Basket-icon'></img></Link>
          <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button className="btn" onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myOrder")}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr style={{ height: "0.5px" }} />
              <li onClick={logOut}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
