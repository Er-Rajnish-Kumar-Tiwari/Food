import React, { useState } from 'react';
import './add.css';
import { assets } from '../../assets/admin_assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Add = () => {
  const [image, setImage] = useState(null); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Salad');
  const [information, setInformation] = useState([]);

  const saveDetails = async (e) => {
    e.preventDefault();
  
    if (!name || !image || !description || !price) {
      toast.warning('Please fill in all the fields!');
      return; 
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image); 
  
      const response = await axios.post('https://food-backend-7lkf.onrender.com/insert', formData);
  
      if (response) {
        setInformation([...information, { name, description, price, category }]);
        toast.success('Food item inserted successfully!');
  
        setCategory('Salad');
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
      }
      else{
        toast.error("Some error in insert api!");
      }
  };
  
  return (
    <div className='add'>
      <form className='flex-col ' onSubmit={saveDetails}>
        <div className='upload-product-image flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            hidden
            required
          />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='name'
            placeholder='Type here'
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='description'
            rows={4}
            placeholder='Write content here'
            required
          />
        </div>

        <div className='add-product-category-price'>
          <div className='add-product-category flex-col'>
            <p>Product category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='category'
              required
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
              <option value='Noodles'>Non Veg</option>
            </select>
          </div>

          <div className='add-product-price flex-col'>
            <p>Product price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type='number'
              name='price'
              placeholder='Rs......'
              required
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>
          ADD
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Add;
