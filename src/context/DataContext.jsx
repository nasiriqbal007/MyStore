import axios from "axios";
import { createContext, useState, useMemo } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapiserver.reactbd.org/api/products"
      );
      const productData = res.data.data;
      setData(productData);
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueCategories = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((item) => item.category))];
  }, [data]);

  const uniqueBrands = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((item) => item.brand))];
  }, [data]);

  return (
    <DataContext.Provider
      value={{ data, setData, fetchProducts, uniqueCategories, uniqueBrands }}
    >
      {children}
    </DataContext.Provider>
  );
};
