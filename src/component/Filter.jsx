import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Filter = ({
  search,
  setSearch,
  price,
  setPrice,
  brand,
  setBrand,
  category,
  setCategory,
  handleCategoryChange,
  handleBrandChange,
}) => {
  const { uniqueCategories, uniqueBrands } = useContext(DataContext);

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategories?.map((cat, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={cat}
                checked={category === cat}
                value={cat}
                onChange={(e) => handleCategoryChange(e)}
              />
              <button className="cursor-pointer uppercase">{cat}</button>
            </div>
          );
        })}
      </div>
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      {uniqueBrands?.map((b, index) => {
        return (
          <div key={index} className="flex gap-2">
            <input
              type="checkbox"
              name={b}
              checked={brand === b}
              value={b}
              onChange={(e) => handleBrandChange(e)}
            />
            <button
              onClick={() => setBrand(b)}
              className="cursor-pointer uppercase"
            >
              {b}
            </button>
          </div>
        );
      })}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ${price[0]} - ${price[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          name=""
          id=""
          value={price[1]}
          onChange={(e) => setPrice([price[0], Number(e.target.value)])}
          className="transition-all"
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPrice([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
