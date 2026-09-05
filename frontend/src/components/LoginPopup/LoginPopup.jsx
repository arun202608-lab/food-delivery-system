import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import {assets} from "../../assets/assets"
import { StoreContext } from '../../Context/StoreContext'
import Cookies from "js-cookie" 
import axios from "axios"
const LoginPopup = ({setIsShowLogin}) => {
  const {url,setToken}=useContext(StoreContext)
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const[currState,setCurrState]=useState("Login")
 const onClickData = event => {
  const {name, value} = event.target

  setData(prevData => ({
    ...prevData,
    [name]: value,
  }))
 }
  const onSubmitLogin = async event => {
  event.preventDefault()

  try {
    let newUrl = url

    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    console.log("Sending request to:", newUrl)
    console.log("Data:", data)

    const response = await axios.post(newUrl, data)

    console.log("Response:", response.data)

    if (response.data.success) {
      Cookies.set("token", response.data.token, {
        expires: 30,
      })

      setToken(response.data.token)
      setIsShowLogin(false)
    } else {
      alert(response.data.message)
    }
  } catch (error) {
    console.log("Login Error:", error)
    console.log(error.response?.data)

    alert(
      error.response?.data?.message ||
        "Unable to connect to server"
    )
  }
}
  
  return (
    <div className='login-popup'>
        
        <form action="" onSubmit={onSubmitLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setIsShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name="name" onChange={onClickData} value={data.name} type="text" placeholder='Your name' required/>}
            <input name="email" onChange={onClickData} value={data.email} type="email" placeholder='Your email' required />
            <input name="password" onChange={onClickData} value={data.password} type="password" placeholder='Password' required/>
          </div>
 
          <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
          <div className="login-popup-condition">
             <input type="checkbox" required />
             <p>By contuning, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState==="Login"
          ?<p>Create a new acocunt? <span onClick={()=>setCurrState("Sign Up")}>CLick here </span></p>
          :<p>Already have an acocunt <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup
