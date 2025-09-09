import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max flex flex-col">
      {/* Image */}
      <div onClick={() => navigate(`/products/${product._id}`)}>
        <img
          src={product.image}
          alt={product.title}
          className="bg-gray-100 w-full aspect-square object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div className="mt-2 flex flex-col gap-1">
        <h1 className="line-clamp-2 font-semibold text-sm sm:text-base">
          {product.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 font-bold">
          ${product.price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-red-500 px-2 sm:px-3 py-2 text-sm sm:text-lg rounded-md text-white w-full flex gap-2 items-center justify-center mt-2 font-semibold hover:bg-red-600 transition"
      >
        <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
