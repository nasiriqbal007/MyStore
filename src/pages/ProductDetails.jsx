import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { IoCartOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Loading from "../assets/Loading4.webm"; // loader

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useContext(DataContext);
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, i) =>
          i < rating ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-gray-300" />
          )
        )}
      </div>
    );
  };

  useEffect(() => {
    if (data.length > 0) {
      const found = data.find((p) => p._id === Number(id));
      if (found) {
        setProduct(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  }, [data, id]);

  if (data.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <video
          muted
          autoPlay
          loop
          className="w-[150px] sm:w-[250px] md:w-[400px]"
        >
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );

  if (notFound)
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        Product with ID {id} not found!
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <video
          muted
          autoPlay
          loop
          className="w-[150px] sm:w-[250px] md:w-[400px]"
        >
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );

  return (
    <div className="px-4 pb-4 md:px-0 max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {/* Product Image */}
      <div className="w-full flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-2xl w-full md:w-[500px] bg-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        <h1 className="md:text-3xl text-xl font-bold text-gray-800">
          {product.title}
        </h1>
        <div className="text-gray-700 text-sm sm:text-base">
          {product.brand?.toUpperCase()} / {product.category?.toUpperCase()} /{" "}
          {product.model}
        </div>

        <p className="font-semibold flex items-center md:text-lg text-sm flex-wrap gap-2">
          $
          <span className="md:text-4xl text-3xl">
            {product.discountedPrice}
          </span>
          <span className="line-through text-gray-500 ml-2">
            ${product.price}
          </span>
          <span className="text-green-600 ml-2">
            (
            {Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )}
            % off)
          </span>
        </p>

        <p className="text-gray-600 text-sm sm:text-base">
          {product.description}
        </p>

        {/* Quantity Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              min={1}
              value={1}
              className="w-20 border border-gray-300 rounded-lg px-3 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <StarRating rating={product.rating} />
        </div>

        <div className="w-full md:w-96">
          <button
            onClick={() => addToCart(product)}
            className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md w-full"
          >
            <IoCartOutline className="w-6 h-6" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
