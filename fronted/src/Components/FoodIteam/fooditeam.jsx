import React, { useContext } from 'react';
import './fooditeam.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/storeContext';

const FoodIteam = ({ iteamId, price, description, name, image }) => {

    const { cartIteam, addToCart, removeToCart, filteredItems } = useContext(StoreContext);

    // Get the count for the current item
    const itemCount = cartIteam && cartIteam[iteamId] ? cartIteam[iteamId] : 0;

    // If no filteredItems, render all food items
    if (!filteredItems || filteredItems.length === 0) {
        return (
            <div className='food-iteam'>
                <div className="food-iteam-img-container">
                    <img className='food-image' src={`http://localhost:2000/images/${image}`} alt='food-image' />

                    {itemCount === 0 ? (
                        <img onClick={() => addToCart(iteamId)} className='add' src={assets.add_icon_white} alt='add' />
                    ) : (
                        <div className='food-iteam-counter'>
                            <img onClick={() => removeToCart(iteamId)} src={assets.remove_icon_red} alt="mines" className="mines" />
                            <p>{itemCount}</p>
                            <img onClick={() => addToCart(iteamId)} src={assets.add_icon_green} alt="plus" className="plus" />
                        </div>
                    )}
                </div>

                <div className="food-iteam-info">
                    <div className="food-iteam-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="rating-stars" />
                    </div>
                    <p className="food-iteam-description">{description}</p>
                    <p className="food-iteam-price">Rs.{price}</p>
                </div>
            </div>
        );
    }

    // If there are filteredItems, render only those
    return (
        <div className="food-iteams-container">
            {filteredItems.map((item) => {
                const { _id, price, description, name, image } = item;
                const itemCount = cartIteam && cartIteam[_id] ? cartIteam[_id] : 0;

                return (
                    <div className='food-iteam' key={_id}>
                        <div className="food-iteam-img-container">
                            <img className='food-image' src={`http://localhost:2000/images/${image}`} alt='food-image' />

                            {itemCount === 0 ? (
                                <img onClick={() => addToCart(_id)} className='add' src={assets.add_icon_white} alt='add' />
                            ) : (
                                <div className='food-iteam-counter'>
                                    <img onClick={() => removeToCart(_id)} src={assets.remove_icon_red} alt="mines" className="mines" />
                                    <p>{itemCount}</p>
                                    <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="plus" className="plus" />
                                </div>
                            )}
                        </div>

                        <div className="food-iteam-info">
                            <div className="food-iteam-name-rating">
                                <p>{name}</p>
                                <img src={assets.rating_starts} alt="rating-stars" />
                            </div>
                            <p className="food-iteam-description">{description}</p>
                            <p className="food-iteam-price">Rs.{price}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FoodIteam;
