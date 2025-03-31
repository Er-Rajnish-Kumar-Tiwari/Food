import React from 'react'
import './final.css';
import success from './success.gif';
import { useNavigate } from 'react-router-dom';

const Final = () => {

    const navigate=useNavigate();
  return (
    <div className='final'>
        <img src={success} alt=''></img>
        <p>Order Placed Successfully</p>
        <button onClick={()=>navigate('/')}>Countinue Shoping</button>
        <button onClick={()=>navigate('/myOrder')}>Your Orders</button>
    </div>
  )
}

export default Final