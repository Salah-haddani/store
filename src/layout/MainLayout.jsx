import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CartSidebar from "../components/CartSidebar/CartSidebar";
import { useCart } from "../context/CartContext";

const MainLayout = ({ children }) => {
  const { isCartOpen, toggleCart } = useCart();

  const mainContentClasses = `
    flex-grow 
    pl-20 
    lg:pl-64
    transition-all 
    duration-300 
    ease-in-out
  `;

  return (
    <div className="flex bg-softGray1 min-h-screen">
      <Sidebar />

      <main className={mainContentClasses}>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      <CartSidebar />

      {isCartOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default MainLayout;
