import React, { useContext } from 'react'
import './explore.css'
import { StoreContext } from '../../Context/storeContext'

const Explore = ({catogery,setCatogery}) => {
    const {menu_list}=useContext(StoreContext);
  return (
    <div className='explore-menu' id='explore-menu'>

        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose frome a divers menu featuring a decetable array of dishes. Our mission to is to satisfy your cravings and elevate your dining exprience, one delicious meal at a time.</p>

        <div className="explore-menu-list">
            {menu_list.map((iteam,index)=>{
                return(

                    <div onClick={()=>setCatogery(prev=>prev===iteam.menu_name?"All":iteam.menu_name)} key={index} className="explore-menu-list-iteam">
                        <img className={catogery===iteam.menu_name?"active":""} src={`http://localhost:2000/menuImage/${iteam.menu_image}`} alt='menu-img'></img>
                        <p>{iteam.menu_name}</p>
                    </div>

                )
            })}
        </div>
        <hr/>

    </div>
  )
}

export default Explore