import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  const fetchBestSeller = () => {
    if (!products || products.length === 0) return;
  
  const bestProduct = products.filter((item) => !item.bestseller); 
  
    if (bestProduct.length === 0) return; 
  
    const randomBestProducts = [];
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * bestProduct.length);
      randomBestProducts.push(bestProduct[index]);
    }
  
    setBestSeller(randomBestProducts);
  };
  
  useEffect(() => {
    if (products.length > 0) {
      fetchBestSeller();
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Shop our most-loved picks—customer favorites, just for you!"
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
