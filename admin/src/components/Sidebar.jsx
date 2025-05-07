import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex item-center gap-3 border border-gray-300 border-r- px-3 py-3 rounded-1"
          to="/add"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex item-center gap-3 border border-gray-300 border-r- px-3 py-3 rounded-1"
          to="/list"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex item-center gap-3 border border-gray-300 border-r- px-3 py-3 rounded-1"
          to="/orders"
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Orders Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
