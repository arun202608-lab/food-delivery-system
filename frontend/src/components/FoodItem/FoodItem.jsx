import React ,{useContext} from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const FoodItem = (props) => {
    const{foodItemList}=props
    const{_id,name,price,image,description}=foodItemList
     
    const {addToCart,
        CartItem,url,
        removeCartItem}=useContext(StoreContext)
  return (
    <div className='food-item'>
       <div className="food-item-image-con">
        <img className='food-item-image' src={`${url}/images/`+image} alt={name} />
        {!CartItem[_id] ?<img className='add' onClick={()=>addToCart(_id)} src={assets.add_icon_white}/>:
        <div className='food-item-counter'>
          <img onClick={()=> removeCartItem(_id)} src={assets.remove_icon_red} alt=""/>
          <p>{CartItem[_id]}</p>
          <img onClick={()=>addToCart(_id)} src={assets.add_icon_green} alt=""/>
          </div>
        }
       </div>
       <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="rating star"/>
        </div>
        <p className="food-item-description">
            {description}
        </p>
        <p className="food-item-price">${price}</p>
       </div>
    </div>
  )
}

export default FoodItem
