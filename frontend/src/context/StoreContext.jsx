import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const SERVER_URL = "https://HungerChase-food-delivery-backend.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (err) {
      console.error("Fetching food list failed:", err);
    }
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${SERVER_URL}/api/v1/cart/add`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${SERVER_URL}/api/v1/cart/remove`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Remove from cart failed:", err);
      }
    }
  };

  const removeParticularItemFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${SERVER_URL}/api/v1/cart/remove-item`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Remove particular item failed:", err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems({});
    if (token) {
      try {
        await axios.post(
          `${SERVER_URL}/api/v1/cart/clear`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Clearing cart failed:", err);
      }
    }
  };

  const loadCartData = async (authToken) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/cart/get`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (err) {
      console.error("Loading cart data failed:", err);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadCartData(savedToken);
    }
    fetchFoodList();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const getTotalCartAmount = () => {
    return food_list.reduce(
      (acc, item) => acc + item.price * (cartItems[item._id] || 0),
      0
    );
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeParticularItemFromCart,
        getTotalCartAmount,
        SERVER_URL,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
