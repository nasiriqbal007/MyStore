import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import NavBar from "./component/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./component/Footer";
import ProductDetails from "./pages/ProductDetails";
import ProductCategory from "./pages/ProductCategory";
import Protected from "./component/Protected";
import { useCart } from "./context/CartContext";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItem, setCartItem } = useCart();

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (prop) => {
      const { latitude, longitude } = prop.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios.get(url);
        setUserLocation(response.data.address);
        setIsDropdownOpen(false);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <BrowserRouter>
      <NavBar
        userLocation={userLocation}
        getLocation={getLocation}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/products/category/:category"
          element={<ProductCategory />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart userLocation={userLocation} getLocation={getLocation} />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
