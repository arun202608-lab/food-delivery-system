import React from 'react'
import "./ExploreMenu.css"
import {menu_list} from "../../assets/assets"
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining exprience, one delicious meal at a time. </p>
      <div className="explore-menu-list">
         {menu_list.map((eachItem,index)=>(
            <div onClick={()=>setCategory(prev=>prev===eachItem.menu_name?"All":eachItem.menu_name)} key={index} className="explore-menu-list-item">
                <img className={category===eachItem.menu_name?"active":""} src={eachItem.menu_image} alt="" />
                <p>{eachItem.menu_name}</p>
            </div>
         ))}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
