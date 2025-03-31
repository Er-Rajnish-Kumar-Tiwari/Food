import React, { useState } from 'react'
import "./home.css";
import Header from '../../Components/Header/header';
import Explore from '../../Components/Explore/explore';
import FoodDisplay from '../../Components/FoodDisplay/fooddisplay';
import MobailApp from '../../Components/MobailApp/mobailapp';

const Home = () => {

  const [catogery,setCatogery]=useState("All")
  return (
    <div>
        <Header/>
        <Explore catogery={catogery} setCatogery={setCatogery}/>
        <FoodDisplay catogery={catogery}/>
        <MobailApp/>
    </div>
  )
}

export default Home;