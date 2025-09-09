import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Loading from "../assets/Loading4.webm";
import ProductList from "../component/ProductList";
import { DataContext } from "../context/DataContext"; // bring products from context

const ProductCategory = () => {
  const [searchData, setSearchData] = useState([]);
  const { data } = useContext(DataContext); // get all products
  const params = useParams();
  const category = params.category; // current category
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.length > 0) {
      const filtered = data.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setSearchData(filtered);
    }
  }, [category, data]);

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft /> Back
          </button>
          {searchData.map((product, index) => (
            <ProductList key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
