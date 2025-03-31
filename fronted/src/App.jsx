import React, { useState } from 'react'
import Navbar from './Components/Navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home'
import Cart from './Pages/Cart/cart'
import Placeorder from './Pages/Placeorder/placeorder'
import Footer from './Components/Footer/footer'
import Login from './Components/Login/login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './Pages/MyOrers/myOrders'
import Final from './Pages/Final/final'

function App() {
  const [showLogin,setShowLogin]=useState(false);

  return (
    <>
      <div className='app'>

        {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer/>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart setShowLogin={setShowLogin}/>} />
          <Route path='/placeorder' element={<Placeorder />} />
          <Route path='/myorder' element={<MyOrders/>}/>
          <Route path='/final' element={<Final/>}></Route>
        </Routes>

      </div>
      <Footer />
    </>
  )
}

export default App