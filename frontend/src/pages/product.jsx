import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    backendUrl,
    token,
    reviews,
    setReviews,
    getReviews,
    handlePost,
    userDetails
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [view, setView] = useState("desc");
  const refElement = useRef();

  const fetchProductData = async () => {
    const fetchedProduct = products.find((item) => item._id === productId);
    if (fetchedProduct) {
      setProductData(fetchedProduct);
      setImage(fetchedProduct.image[0]);
    }
  };

  

  const handleDelete = async (reviewId) => {
    const response = await axios.post(backendUrl + "/api/review/delete", {
      reviewId,
    });
    if (response.data.success) {
      toast(response.data.message);
      fetchProductData();
    } else {
      toast.error(response.data.message);
    }

    try {
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const fetchReviews = async () => {};
  useEffect(() => {
    if (products.length > 0 && productId) {
      fetchProductData();
      getReviews(productId);

    }
  }, [products, productId,reviews]);

  if (!productData) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* Product Image */}
          <div className="flex-1 flex flex-col-reversed gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image?.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                  alt=""
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} alt="" className="w-full h-auto" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              {Array(4)
                .fill(assets.star_icon)
                .map((star, index) => (
                  <img src={star} alt="star" className="w-3.5" key={index} />
                ))}
              <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes?.map((item, index) => (
                  <button
                    onClick={() => setSelectedSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === selectedSize ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(productData._id, selectedSize)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash On Delivery Available</p>
              <p>Easy Return and Exchange Policy Within 7 Days</p>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-20">
          <div className="flex">
            <p
              onClick={() => setView("desc")}
              className="border px-5 py-3 text-sm cursor-pointer"
            >
              Description
            </p>
            <p
              onClick={() => setView("rev")}
              className="border px-5 py-3 text-sm cursor-pointer"
            >
              Reviews ({reviews.length})
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 border text-sm text-gray-500">
          {view === "desc" ? (
            <>
              <p>{productData.description}</p>
              <p>
                Crafted with precision and designed for comfort, this product
                blends quality materials with a stylish and functional design.
                Whether you're looking for everyday use or something special, it
                offers durability, versatility, and a touch of elegance.
                Engineered to meet modern demands, it seamlessly combines
                performance and aesthetics, making it a must-have addition to
                your collection. Experience the perfect balance of innovation
                and practicality, ensuring satisfaction with every use.
              </p>
            </>
          ) : (
            <>
              {reviews.length > 0 ? (
                <>
                  {reviews.map((review, index) => (
                    <div
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 border-b"
                      key={index}
                    >
                      <p className="flex-1">{review.reviewText}</p>
                      <p className="whitespace-nowrap">{userDetails._id === review.userId._id?"You":<>{review.userId.name}</>}.</p>
                      <p className="whitespace-nowrap">
                        {new Date(review.date).toDateString()}
                      </p>

                      {userDetails._id === review.userId._id ? (
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <img className="w-4" src={assets.bin_icon} alt="" />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p>No Reviews </p>
                </>
              )}
              {token ? (
                <>
                  <div className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 ">
                    <input
                      ref={refElement}
                      className="border border-black w-full h-10 p-2 text-black "
                      type="text"
                      placeholder="Write Your Review"
                    />
                    <button
                      onClick={()=> handlePost(productId, refElement.current.value)}
                      className="border p-2 h-10 bg bg-green-500 text-white"
                    >
                      Post
                    </button>
                  </div>
                </>
              ) : (
                <>:</>
              )}
            </>
          )}
        </div>

        {/* Display Related Products */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
