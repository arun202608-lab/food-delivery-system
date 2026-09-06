import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
 const url = "https://food-delivery-system-wcvv.onrender.com";
  const [CartItem, setCartItem] = useState({});
  const [token, setToken] = useState(() => {
    return Cookies.get("token") || "";
  });

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!CartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const removeCartItem = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const laodCartData = async () => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } },
    );
    setCartItem(response.data.cartData || {});
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in CartItem) {
      if (CartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * CartItem[item];
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    console.log(response.data.data);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    fetchFoodList();
    laodCartData(Cookies.get("token"));
  }, []);
  const contextValue = {
    food_list,
    addToCart,
    CartItem,
    removeCartItem,
    setCartItem,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
