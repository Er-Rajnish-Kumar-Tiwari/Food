import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../Context/storeContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setShowLogin }) => {
  const { cartIteam, food_list, removeToCart, getTotalAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = getTotalAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 45;

  return (
    <div className='cart'>
      <div className="cart-iteam">

        <div className="cart-iteam-title">
          <p>Iteams</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr style={{ color: "red", height: "2px", marginBottom: "30px" }} />

        {food_list.length > 0 ? food_list.map((iteam, index) => {
          if (cartIteam[iteam._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-iteam-title cart-iteams'>
                  <img src={`http://localhost:2000/images/${iteam.image}`} alt='' />
                  <p>{iteam.name}</p>
                  <p>Rs.{iteam.price}</p>
                  <p>{cartIteam[iteam._id]}</p>
                  <p>Rs.{iteam.price * cartIteam[iteam._id]}</p>
                  <p style={{ cursor: "pointer" }} onClick={() => removeToCart(iteam._id)}>x</p>
                </div>
                <hr style={{ color: "red", height: "2px", marginBottom: "30px" }} />
              </div>
            );
          }
        }) : <p>Your cart is empty!</p>}
      </div>

      <div className="cart-button">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>Rs.{totalAmount}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{deliveryFee}</p>
            </div>
            <hr style={{ color: "red", height: "2px" }} />

            <div className="cart-total-details">
              <b style={{ fontWeight: "900" }}>Total Amount</b>
              <b style={{ fontWeight: "900" }}>Rs.{totalAmount + deliveryFee}</b>
            </div>
            <hr style={{ color: "red", height: "2px" }} />

          </div>
          {token ?
            <button onClick={() => navigate("/placeorder")} disabled={totalAmount === 0}>Proceed To Continue</button>
            : (
              <button onClick={() => setShowLogin(true)}>Login</button>
            )
          }
        </div>

        <div className="cart-coupon-code">
          <div>
            <p>If you have a coupon code, Enter it here</p>

            <div className="cart-coupon-code-input">
              <input type='text' placeholder='Enter your coupon code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
