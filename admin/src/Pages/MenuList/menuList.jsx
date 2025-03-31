import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './menuList.css';

const MenuList = () => {
  const [menulist, setList] = useState([]);

  const displayList = async () => {
    try {
      const response = await axios.get("http://localhost:2000/displayMenu");
      if (response.status === 200) {
        setList(response.data.menuItems);
      } else {
        toast.error("Error fetching menu list!");
      }
    } catch (error) {
      toast.error(`Failed to fetch menus: ${error.message}`);
    }
  };

  const deleteItems = async (did) => {
    try {
      const response = await axios.delete(`http://localhost:2000/deleteMenu/${did}`);
      if (response.status === 200) {
        toast.success("Menu item deleted successfully!");
        await displayList(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete menu item!");
      }
    } catch (error) {
      toast.error(`Error in delete API: ${error.message}`);
    }
  };

  useEffect(() => {
    displayList();
  }, []);

  return (
    <div className='menu add flex-col'>
      <h2 className='menu-heading'>All Menus List</h2>

      <div className="menu-table">
        <div className="menu-table-format title">
          <b>SL.No</b>
          <b>Image</b>
          <b>Name</b>
          <b>Delete</b>
        </div>

        {menulist.length > 0 ? (
          menulist.map((items, index) => (
            <div key={items._id} className="menu-table-format">
              <p>{index + 1}</p>
              <img 
                src={`http://localhost:2000/menuImage/${items.menu_image}`} 
                alt={`${items.menu_name} image`} 
              />
              <p>{items.menu_name}</p>
              <p 
                className="delete-button" 
                style={{ cursor: "pointer", color: "red" }} 
                onClick={() => deleteItems(items._id)}
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
