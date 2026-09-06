import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="food-delivery-system-bice.vercel.app"><img src={assets.logo} alt="" className="logo" /></a>
      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  )
}

export default Navbar
