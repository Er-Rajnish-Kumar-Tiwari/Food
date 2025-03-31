import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './menu.css';
import { assets } from '../../assets/admin_assets/assets';

const Menu = () => {
  const [menu_image, setImage] = useState(null);
  const [menu_name, setName] = useState('');
  const [information, setInformation] = useState([]);

  const saveDetails = async (e) => {
    e.preventDefault();

    if (!menu_name || !menu_image) {
      toast.warning('Please fill in all the fields!');
      return;
    }

    const formData = new FormData();
    formData.append('menu_name', menu_name);
    formData.append('menu_image', menu_image);

    try {
      const response = await axios.post('http://localhost:2000/insertMenu', formData);

      if (response) {
        setInformation([...information, { menu_name }]);
        toast.success('Food item inserted successfully!');

        setName('');
        setImage(null);
      }
    } catch (error) {
      toast.error('Some error in insert API!');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={saveDetails}>

        <div className='upload-product-image flex-col'>
          <p>Upload Image</p>

          <label htmlFor='menu_image'>
            <img
              src={menu_image ? URL.createObjectURL(menu_image) : assets.upload_area}
              alt=''
            />
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='menu_image'
            hidden
            required
          />
        </div>

        <div className='add-product-name flex-col'>
          <p>Menu name</p>
          <input
            value={menu_name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='menu_name'
            placeholder='Type here'
            required
          />
        </div>

        <button type='submit' className='submit-button'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Menu;
