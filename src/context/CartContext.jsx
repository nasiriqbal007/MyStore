import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // ✅ Add item to cart
  const addToCart = (product) => {
    const existing = cartItem.find((item) => item._id === product._id);

    if (existing) {
      // If already in cart → increase quantity
      setCartItem(
        cartItem.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.info("Product quantity increased!");
    } else {
      // If not in cart → add new with quantity = 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };

  // ✅ Update quantity (increase / decrease)
  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item._id === productId) {
            let newUnit = item.quantity;

            if (action === "increase") {
              newUnit++;
            } else if (action === "decrease") {
              newUnit--;
            }

            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // ✅ Delete item from cart
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item._id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
