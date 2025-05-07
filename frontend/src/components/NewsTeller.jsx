import React from "react";

const NewsTeller = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now and get 20% off
      </p>
      <p className="text-gray-400 mt-3 ">
      Join our community and enjoy exclusive discounts, latest trends, and special offers!
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3">
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsTeller;