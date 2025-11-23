import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const clearCart = () => setItems([]);

  const summary = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
    const taxRate = 0.08;
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  }, [items, promoCode]);

  const updateQuantity = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const addToCart = (product, selectedColor, selectedSize) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor.colorName === selectedColor.colorName &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.selectedColor.colorName === selectedColor.colorName &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          rating: product.rating,
          selectedColor,
          selectedSize,
          quantity: 1,
        },
      ];
    });
  };

  const value = {
    items,
    isCartOpen,
    toggleCart,
    clearCart,
    updateQuantity,
    addToCart,
    summary,
    setPromoCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
