import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from "../../Context/StoreContext"
import { useNavigate } from "react-router-dom"

const Cart = () => {

  const {
    CartItem,
    food_list,
    removeCartItem,
    getTotalCartAmount,
    url
  } = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='cart'>

      <div className="cartItems">

        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {

          if (CartItem && CartItem[item._id] > 0) {

            return (
              <React.Fragment key={item._id}>

                <div className="cart-items-title cart-items-item">

                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />

                  <p>{item.name}</p>

                  <p>₹{item.price}</p>

                  <p>{CartItem[item._id]}</p>

                  <p>
                    ₹{item.price * CartItem[item._id]}
                  </p>

                  <p
                    className='cross'
                    onClick={() => removeCartItem(item._id)}
                  >
                    x
                  </p>

                </div>

                <hr />

              </React.Fragment>
            )
          }

          return null
        })}

      </div>

      <div className="cart-bottom">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                ₹{getTotalCartAmount() === 0 ? 0 : 2}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ₹{
                  getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2
                }
              </p>
            </div>

            <button
              onClick={() => navigate("/order")}
              disabled={getTotalCartAmount() === 0}
            >
              PROCEED TO CHECKOUT
            </button>

          </div>

        </div>

        <div className="cart-promocode">

          <div>
            <p>If you have a promo code, Enter it here</p>

            <div className="cart-promo-input">
              <input
                type="text"
                placeholder='promo-code'
              />

              <button>Submit</button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart