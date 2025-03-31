import React, { useContext } from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../Context/storeContext'
import FoodIteam from '../FoodIteam/fooditeam.jsx';

const FoodDisplay = ({catogery}) => {
    const {food_list}=useContext(StoreContext);

  return (
    <div className='food-display'>
        <h2>Top dishes near you</h2>
        
        <div className="food-display-list">
            {food_list.map((iteam,index)=>{
                
                if(catogery==="All" || catogery===iteam.category){
                    return(
                        <FoodIteam key={index} iteamId={iteam._id} name={iteam.name} image={iteam.image} price={iteam.price} description={iteam.description} category={iteam.category}/>
                    )
                }

            })}
        </div>

    </div>
  )
}

export default FoodDisplay