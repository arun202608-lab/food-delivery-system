import React from 'react'
import {Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Siderbar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const url = "https://food-delivery-system-wcvv.onrender.com"
  return (
    <div>
      <ToastContainer/>
       <Navbar/>
       <hr/>
       <div className="app-content">
        <Siderbar/>
        <Routes>
             <Route path="/add" element={<Add url={url}/>}/>
             <Route path="/list" element={<List url={url}/>}/>
             <Route path="/orders" element={<Order url={url}/>}/>
        </Routes>
       </div>
    </div>
  )
}

export default App
