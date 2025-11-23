import React, { useState } from "react";
import { X, Minus, Plus, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity } = useCart();
  const handleQuantity = (delta) => {
    updateQuantity(item.id, item.quantity + delta);
  };

  return (
    <div className="flex justify-between items-start py-3 border-b border-softGray2/50 last:border-b-0">
      <div className="flex flex-grow">
        <img
          src={item.selectedColor.images[0]}
          alt={item.name}
          className="w-14 h-14 object-cover rounded-lg mr-3 border border-softGray2"
        />
        <div className="flex flex-col text-sm">
          <p className="font-semibold text-textDark">{item.name}</p>
          <div className="flex items-center text-xs mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-softGray3 mr-2">{item.rating}</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-sidebarBg text-actionPrimary">
              {item.category}
            </span>
          </div>
          <p className="text-xs mt-1 text-softGray3">
            Color:{" "}
            <span className="font-medium text-textDark">
              {item.selectedColor.name}
            </span>
            , Size:{" "}
            <span className="font-medium text-textDark">
              {item.selectedSize}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end flex-shrink-0 ml-3">
        <p className="font-bold text-textDark mb-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <div className="flex items-center border border-softGray2 rounded-md">
          <button
            onClick={() => handleQuantity(-1)}
            className="p-1 text-softGray2 hover:text-textDark disabled:opacity-50"
            disabled={item.quantity === 1}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-2 text-sm font-medium text-textDark">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantity(1)}
            className="p-1 text-softGray2 hover:text-textDark"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { items, isCartOpen, toggleCart, clearCart, summary, setPromoCode } =
    useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const itemCount = items.length;

  const sidebarPosition = isCartOpen ? "translate-x-0" : "translate-x-full";

  const handleProceedPayment = () => {
    if (!name || !address) {
      alert("Please enter your name and address before proceeding.");
      return;
    }
    console.log("Proceeding to payment with:", summary);
  };

  const handleApplyPromo = () => {
    setPromoCode(promoInput.trim().toUpperCase());
    setPromoInput("");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 
                  transform ${sidebarPosition} transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-5 border-b border-softGray2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-textDark flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-actionPrimary" /> Cart
            </h2>
            <button
              onClick={toggleCart}
              className="p-1 text-textDark hover:bg-softGray1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-softGray3">{itemCount} items selected</p>
            {itemCount > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3 h-3 mr-1" /> Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-2">
          {itemCount > 0 ? (
            items.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedColor.colorName}-${item.selectedSize}`}
                item={item}
              />
            ))
          ) : (
            <div className="text-center py-10 text-softGray2">
              Your cart is empty.
            </div>
          )}
        </div>

        <div className="p-5 border-t border-softGray2 flex-shrink-0">
          <h3 className="text-md font-semibold text-textDark mb-2">
            Customer Information
          </h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-base w-full mb-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-base w-full mb-4 py-1 text-sm"
          />

          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="input-base flex-grow py-1 text-sm"
            />
            <button
              onClick={handleApplyPromo}
              className="px-3 py-1 bg-actionPrimary text-white rounded-lg hover:bg-actionSecondary transition-colors text-sm"
            >
              Apply
            </button>
          </div>

          <h3 className="text-md font-semibold text-textDark mb-2">Summary</h3>
          <div className="space-y-1 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-softGray3">Subtotal:</span>
              <span className="font-medium text-textDark">
                ${summary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-softGray3">Discounts:</span>
              <span
                className={`font-medium ${
                  summary.discount > 0 ? "text-red-500" : "text-textDark"
                }`}
              >
                -${summary.discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-b border-softGray2 pb-1">
              <span className="text-softGray3">Tax (8%):</span>
              <span className="font-medium text-textDark">
                ${summary.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-lg font-bold text-textDark">Total:</span>
              <span className="text-lg font-bold text-actionPrimary">
                ${summary.total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleProceedPayment}
            className="btn-primary w-full py-2 text-base"
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
