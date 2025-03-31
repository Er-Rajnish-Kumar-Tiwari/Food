import React, { useEffect, useState } from 'react'
import './list.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const FoodList = () => {

  const [foodlist, setList] = useState([]);

  const displayList = async () => {
    const response = await axios.get("http://localhost:2000/display");

    if (response) {
      console.log(response.data);
      setList(response.data.foodItems);
    }
    else {
      toast.error("Some error in list api!");
    }
  };

  const deleteItems=async(did)=>{
    const response=await axios.delete(`http://localhost:2000/delete/${did}`);
    if(response){
      await displayList();
      toast.success("Food-Item deleted successfully!");
    }
    else{
      toast.error("Some error in delete api!");
    }
  };

  useEffect(() => {
    displayList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2 style={{color:"maroon"}}>All Foods List</h2>

      <div className="list-table">

        <div className="list-table-format title">
          <b>SL.No</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Delete</b>
        </div>

        {foodlist.map((items, index) => {

          return (
            <div key={index} className="list-table-format">

              <p>{index+1}</p>
              <img src={`http://localhost:2000/images/${items.image}`} />
              <p>{items.name}</p>
              <p>{items.category}</p>
              <p>{items.price}</p>
              <p style={{cursor:"pointer" ,color:"red"}} onClick={()=>deleteItems(items._id)}>X</p>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default FoodList;