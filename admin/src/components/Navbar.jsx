import React from 'react'
import { assets } from "../assets/assets.js";
const Navbar = ({setToken}) => {
  return (
    <>
    <div className='flex items-center py-2 px-[4%] justify-between  bg-green-300' >
        {/* <img className='w-[max-(1%,80px)]' src={assets.logo1} alt="" /> */}
        <h1 className='text-3xl font-bold'>KRISHI</h1>
        <p>Admin Panel</p>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' onClick={()=>setToken('')}>Logout</button>
    </div>
    </>
  )
}

export default Navbar