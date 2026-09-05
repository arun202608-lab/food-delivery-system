import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
const Order = ({ url }) => {
  const [order, setOrder] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/list");
      console.log(res.data.data);
      if (res.data.success) {
        setOrder(res.data.data);
        console.log(res.data.data);
      } else {
        toast.error("Error in fetching orders");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const statusHandler = async (orderId, newStatus) => {
    try {
      const res = await axios.post(url + "/api/order/status", { orderId, status: newStatus });
      if (res.data.success) {
        toast.success("Status Updated");
        fetchOrders();
      } else {
        toast.error("Error in updating status");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName+" "+order.address.lastName} </p>
                <div className="order-item-address">
                <p className="order-item-address">{order.address.street}</p>
                <p>{order.address.city+", " +order.address.state+", " +order.address.country+", "+order.address.zipCode}</p>
                </div>
                <p classname="order-item-phone">{order.address.phone}</p>


              </div>
              <p>Items : {order.items.length}</p>
              <p className="order-item-total">Total : ${order.amount.toFixed(2)}</p>
              <select className="order-item-status" value={order.status} onChange={(e) => {
                statusHandler(order._id, e.target.value);
              }}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                 
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
