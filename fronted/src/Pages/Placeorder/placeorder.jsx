import React, { useContext, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/storeContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {

  const { getTotalAmount, food_list, token, cartIteam } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    landMark: "",
    pinCode: "",
    country: "",
    phone: "",
    state: "",
    email: "",
    city: ""
  });

  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const place = async (event, req, res) => {
    event.preventDefault();

    const orderItems = [];
    food_list.map((item) => {
      if (cartIteam[item._id] > 0) {
        const itemInfo = item;

        itemInfo["quantity"] = cartIteam[item._id];
        orderItems.push(itemInfo);
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 45,
    }

    await axios.post("https://food-backend-7lkf.onrender.com/orderPlace", orderData, { headers: { token } });
    toast.success("Order placed successfully!");
    setData({
      firstName: "",
      lastName: "",
      landMark: "",
      pinCode: "",
      country: "",
      phone: "",
      state: "",
      email: "",
      city: ""
    });
  };

  const paymentHandler = async (event) => {

    const response = await axios.post("https://food-backend-7lkf.onrender.com/payments", {
      amount: amount,
      currency: currency,
      receipt: receiptId,
    },
      {
        headers: {
          "Content-Type": "application/json",
        },

      });

    const order = response.data;

    var options = {
      "key": "rzp_test_6MT6WhKAXLy5Tm", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "Tanish Food Corner", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        const body={
          ...response,
        };

        const validatres=await fetch("https://food-backend-7lkf.onrender.com/validate",{
          method:"POST",
          body:JSON.stringify(body),

          headers:{
            "Content-Type":"application/json",
          },
        });

        const jsonRes=await validatres.json();
        console.log(jsonRes);
        
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Tanish", //your customer's name
        "email": "tanish281202@gmail.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    navigate("/final");
    event.preventDefault();

  };

  return (
    <form onSubmit={place} className='placeorder'>

      <div className="placeorder-left">
        <p className="placeorder-title">Delivery Information</p>

        <div className="multi-flieds">
          <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='Enter your first name' />
          <input required type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Enter your last name' />
        </div>

        <input required type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Enter your email' />
        <input required type="text" name='landMark' value={data.landMark} onChange={onChangeHandler} placeholder='Enter your land-mark' />

        <div className="multi-flieds">
          <input required type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='Enter your city' />
          <input required type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='Enter your state' />
        </div>

        <div className="multi-flieds">
          <input required type="text" name='pinCode' value={data.pinCode} onChange={onChangeHandler} placeholder='Enter your pin-code' />
          <input required type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Enter your country' />
        </div>

        <input required type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Enter your phone' />

      </div>

      <div className="placeorder-right">
        <div className="cart-total">

          <h2>Cart Totals</h2>
          <div>

            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>Rs.{getTotalAmount()}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalAmount() === 0 ? 0 : 45}</p>
            </div>
            <hr style={{ color: "red", height: "2px" }} />

            <div className="cart-total-details">
              <b style={{ fontWeight: "900" }}>Total Amount</b>
              <b style={{ fontWeight: "900" }}>Rs.{getTotalAmount() === 0 ? 0 : getTotalAmount() + 45}</b>
            </div>
            <hr style={{ color: "red", height: "2px" }} />

            <h2>Payment Method</h2>
            <input style={{ marginRight: "10px",border:"1px solid tomato" }} type='radio' value="Cash On Delivery" required /><b style={{fontWeight:"500"}}>Online Payment</b>

          </div>
          <button type='submit' onClick={paymentHandler}>Continue for Payment</button>

        </div>

      </div>

    </form>
  )
}
export default Placeorder;
