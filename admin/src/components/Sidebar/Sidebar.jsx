import React from 'react'
import "./Siderbar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='siderbar'>
       <div className="siderbar-options">
        <NavLink to="/add" className="siderbar-option">
           <img src={assets.add_icon} alt="" />
           <p>List Items</p>
        </NavLink>
         <NavLink to="/list" className="siderbar-option">
           <img src={assets.order_icon} alt="" />
           <p>List Items</p>
        </NavLink>
         <NavLink to="/orders" className="siderbar-option">
           <img src={assets.order_icon} alt="" />
           <p>Orders</p>
        </NavLink>
       </div>
    </div>
  )
}

export default Sidebar
