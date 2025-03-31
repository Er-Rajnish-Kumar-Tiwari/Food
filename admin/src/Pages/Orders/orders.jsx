import React, { useEffect, useState } from 'react';
import './orders.css';
import axios from 'axios';
import { assets } from '../../assets/admin_assets/assets';

const Orders = () => {

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://food-backend-7lkf.onrender.com/ordersList");
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const stateHandler = async (event, orderId) => {
    try {
      const response = await axios.post("https://food-backend-7lkf.onrender.com/orderstatus", {
        orderId,
        status: event.target.value
      });

      if (response.status === 200) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">
        {data.map((orderitem, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />

              <p style={{ marginTop: "15px" }} className='order-item-food'>
                {orderitem.items.map((item, index) => {
                  if (index === orderitem.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>

              <p className='order-name'>
                {orderitem.address.firstName + " " + orderitem.address.lastName}
              </p>

              <div className="order-address">
                <p>{orderitem.address.country + " " + orderitem.address.state}</p>
                <p>{orderitem.address.city + " " + orderitem.address.pinCode}</p>
                <p>{orderitem.address.landMark}</p>
              </div>

              <p>{orderitem.address.phone}</p>
              <p>{orderitem.items.length}</p>
              <p>Rs.{orderitem.amount}.00</p>

              <select 
                value={orderitem.status} 
                onChange={(event) => stateHandler(event, orderitem._id)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
