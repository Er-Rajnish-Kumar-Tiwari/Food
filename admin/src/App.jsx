import React from 'react'
import Navbar from './Components/Navbar/navbar'
import Sidebar from './Components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/add'
import Orders from './Pages/Orders/orders'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import FoodList from './Pages/List/list'
import Menu from './Pages/Menu/menu'
import MenuList from './Pages/MenuList/menuList'



const App = () => {
  return (
    <div>
      <Navbar/>
      <ToastContainer/>
      <hr/>

      <div className="app-content">
        <Sidebar/>

        <Routes>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/list' element={<FoodList/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='menu' element={<Menu/>}></Route>
          <Route path='menuList' element={<MenuList/>}></Route>
        </Routes>
        
      </div>

    </div>
  )
}

export default App