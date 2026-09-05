import React, { Profiler, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
const Navbar = ({ setIsShowLogin }) => {
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("Home");
  const navigate= useNavigate()
  const logout=()=>{
      Cookies.remove('token')
      setToken("")
      navigate("/")
  }
  return (
    <div className="nav-bar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-app")}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-us")}
          className={menu === "Contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setIsShowLogin(true)}>Sign In</button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="" />

            <ul className="nav-profile-dropdown">
               <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt=""/>Orders</li>
               <hr/>
               <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
