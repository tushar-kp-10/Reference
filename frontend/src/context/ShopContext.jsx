import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();
import { jwtDecode } from "jwt-decode";

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUsercart = async (token) => {
    const response = await axios.post(
      backendUrl + "/api/cart/get",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getReviews = async (productId) => {
    try {
      const response = await axios.post(backendUrl + "/api/review/get", {
        productId,
      });
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePost = async (productId, reviewText) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/review/add",
        { productId, reviewText },
        { headers: { token } }
      );
      if (response.data.success) {
        toast("Review Posted");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUsercart(localStorage.getItem("token"));
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      if (token) {
        const decode = jwtDecode(token);
        const userId = decode.id;
        const response = await axios.post(backendUrl + "/api/user/details", {
          userId,
        });
        if (response.data.success) {
          setUserDetails(response.data.userInfo);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateUserDetails = async (
    newName,
    newAddress,
    newContact,
    newEmail
  ) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/update",
        { newName, newAddress, newEmail, newContact },
        { headers: { token } }
      );
      if (response.data.success) {
        setUserDetails(response.data.updatedUser);
        toast("User Updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const resetUserPassword = async (currPass, newPass) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/reset",
        { currPass, newPass },
        { headers: { token } }
      );
      if (response.data.success) {
        setUserDetails(response.data.updatedUser);
        toast("Password Updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
    fetchUserDetails();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setshowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    reviews,
    setReviews,
    getReviews,
    handlePost,
    userDetails,
    updateUserDetails,
    resetUserPassword,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
