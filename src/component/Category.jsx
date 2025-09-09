import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  const getUniqueValues = (data, prop) => {
    const values = data?.map((item) => item[prop]);
    return [...new Set(values)];
  };

  const uniqueCategories = getUniqueValues(data, "category");

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {uniqueCategories?.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => navigate(`/products/category/${item}`)}
                className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
