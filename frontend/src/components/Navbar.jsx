import React, { useContext, useState } from "react";

import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visibility, setVisibility] = useState(false);
  const {
    setshowSearch,
    search,
    setSearch,
    getCartCount,
    setToken,
    token,
    setCartItems,
    navigate,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex item-center justify-between py-5 font-medium bg-green-300">
      <Link to={"/"}>
        <h1 className="pl-5">KRISHI</h1>
        {/* <h1 className="pl-5">KRISHI</h1> */}
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 hidden">
        <NavLink to="/" className="flex flex-col item-center gap-1">
          <p>Home</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col item-center gap-1">
          <p>Collection</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col item-center gap-1">
          <p>About</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col item-center gap-1">
          <p>Contact</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/crop_assist" className="flex flex-col item-center gap-1">
          <p>Crop-Assist</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex item-center pr-5 gap-6">
        <img
          onClick={() => setshowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 h-6  cursor-pointer"
        />
        <div className="group relative">
          <Link to="/login">
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt=""
            />
          </Link>

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-5 rounded">
                <p onClick={()=> navigate('/profile')}  className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5"
            alt=""
            srcSet=""
          />
          <p className="absolute left-[8px] bottom-[50px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisibility(true)}
          src={assets.menu_icon}
          className="w-5 h-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visibility ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisibility(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisibility(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisibility(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisibility(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisibility(true)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            onClick={() => setVisibility(true)}
            className="py-2 pl-6 border"
            to="/crop_assist"
          >
            Crop-Assist
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
