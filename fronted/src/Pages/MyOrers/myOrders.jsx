import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css';
import { StoreContext } from '../../Context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {

    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post("http://localhost:2000/orders", {}, { headers: { token } });
        setData(response.data.data);
        
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>

            <div className="container">
                {data.map((orderitem,index)=>{
                    return(

                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />

                            <p style={{marginTop:"15px"}}>{orderitem.items.map((item,index)=>{
                                if(index===orderitem.items.length-1){
                                    return item.name+" x "+item.quantity
                                }
                                else{
                                    return item.name+" x "+item.quantity+" , "
                                }
                            })}
                            </p>

                            <p>Rs.{orderitem.amount}.00</p>
                            <p>items :- {orderitem.items.length}</p>
                            <p><span>&#x25cf; </span><b>{orderitem.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>

                    )
                })}
            </div>

        </div>
    )
}

export default MyOrders