import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FaFilter } from "react-icons/fa6";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  price,
  setPrice,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { uniqueCategories, uniqueBrands } = useContext(DataContext);

  const toggleFilter = () => setOpenFilter(!openFilter);

  return (
    <>
      {/* Filter toggle button */}
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter onClick={toggleFilter} className="text-gray-800" />
      </div>

      {/* Filter panel */}
      {openFilter && (
        <div className="bg-gray-100 p-2 md:hidden">
          {/* Search */}
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />

          {/* Category */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            {uniqueCategories?.map((cat, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  name={cat}
                  checked={category === cat}
                  value={cat}
                  onChange={handleCategoryChange}
                />
                <button className="cursor-pointer uppercase">{cat}</button>
              </div>
            ))}
          </div>

          {/* Brand */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
          <select
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
            value={brand}
            onChange={handleBrandChange}
          >
            <option value="All">All</option>
            {uniqueBrands?.map((b, index) => (
              <option key={index} value={b}>
                {b.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Price */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label>
              Price Range: ${price[0]} - ${price[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={price[1]}
              onChange={(e) => setPrice([price[0], Number(e.target.value)])}
              className="transition-all w-[200px]"
            />
          </div>

          {/* Reset Button */}
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPrice([0, 5000]);
              setOpenFilter(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};

export default MobileFilter;
