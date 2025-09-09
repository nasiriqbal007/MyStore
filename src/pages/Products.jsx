import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import Filter from "../component/Filter";
import ProductCard from "../component/ProductCard";
import Pagination from "../component/Pagination";
import MobileFilter from "../component/MobileFilter";
import Loading from "../assets/Loading4.webm"; // loader video

const Products = () => {
  const { data, fetchProducts } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 5000]);
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    fetch();
  }, []);

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (num) => setPage(num);

  const filterData = data?.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || product.category === category) &&
      (brand === "All" || product.brand === brand) &&
      product.price >= price[0] &&
      product.price <= price[1]
    );
  });

  const dynamicPage = Math.ceil(filterData?.length / 8);

  // Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px]">
        <video
          muted
          autoPlay
          loop
          className="w-[200px] sm:w-[300px] md:w-[400px]"
        >
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 mx-auto mb-10">
      {/* Mobile Filter */}
      <MobileFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
      />

      {/* Desktop + Product Grid */}
      {filterData?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter (Desktop) */}
          <Filter
            search={search}
            setSearch={setSearch}
            price={price}
            setPrice={setPrice}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />

          {/* Product Grid + Pagination */}
          <div className="flex flex-col flex-1 justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10 w-full">
              {filterData
                ?.slice(page * 8 - 8, page * 8)
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
            <Pagination
              pageHandler={pageHandler}
              page={page}
              dynamicPage={dynamicPage}
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No Items Found
        </div>
      )}
    </div>
  );
};

export default Products;
