import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  const getRandomLatestProducts = (arr) => {
    if (!arr || arr.length === 0) return; 

    const randomProducts = [];
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * arr.length);
      randomProducts.push(arr[index]);
    }
    setLatestProducts(randomProducts);
  };

  useEffect(() => {
    if (products.length > 0) {
      getRandomLatestProducts(products);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm;text-sm md:text-base text-gray-600">
          "Fresh styles, timeless elegance—shop the newest trends now!"
        </p>
      </div>

      {/* rendering products */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts &&
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestCollection;
