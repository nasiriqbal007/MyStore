import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="mt-2 p-2">
      <div className="bg-gray-100 rounded-md p-4 flex flex-col sm:flex-row gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full sm:w-48 h-48 sm:h-60 rounded-md object-cover cursor-pointer"
          onClick={() => navigate(`/products/${product._id}`)}
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-lg sm:text-xl line-clamp-3 hover:text-red-400">
              {product.title}
            </h1>
            <p className="font-semibold flex flex-wrap items-baseline gap-2 mt-2 text-sm sm:text-lg">
              <span className="text-3xl sm:text-4xl">
                ${product.discountedPrice}
              </span>
              <span className="line-through text-gray-500">
                ${product.price}
              </span>
              <span className="text-green-600">
                (
                {Math.round(
                  ((product.price - product.discountedPrice) / product.price) *
                    100
                )}
                % off)
              </span>
            </p>
            <p className="text-sm sm:text-base mt-2">
              FREE delivery <span className="font-semibold">Fri, 18 Apr</span>
              <br />
              Or fastest delivery{" "}
              <span className="font-semibold">Tomorrow, 17 Apr</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-2 self-start">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
