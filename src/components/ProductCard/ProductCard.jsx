import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const initialColor = product.colors[0];

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart } = useCart();

  const isSizeAvailable = (size) => product.availableSizes.includes(size);

  const currentImageUrl = selectedColor.images
    ? selectedColor.images[0]
    : product.defaultImage;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both a color and a size before adding to cart.");
      return;
    }

    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <div className="card-base w-72 bg-white flex flex-col overflow-hidden group">
      <div className="relative">
        <img
          src={currentImageUrl}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute bottom-3 left-3 flex space-x-2 p-1 bg-white/70 backdrop-blur-sm rounded-full shadow-md">
          {product.colors.map((color) => (
            <div
              key={color.colorName}
              onClick={() => setSelectedColor(color)}
              className={`
                w-4 h-4 rounded-full cursor-pointer border-2 transition-all duration-150
                ${
                  selectedColor.colorName === color.colorName
                    ? "border-1 border-actionPrimary scale-110 shadow-lg"
                    : "border-white"
                }
              `}
              style={{ backgroundColor: color.hex }}
              title={color.colorName}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-textDark mb-1">{product.name}</h3>

        <div className="flex justify-between items-center text-sm mb-3">
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-sidebarBg text-actionPrimary">
            {product.category}
          </span>

          <div className="flex items-center text-textDark">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-semibold mr-1">{product.rating}</span>
            <span className="text-softGray3 text-xs">({product.reviews})</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-softGray3 whitespace-nowrap">
              Sizes:
            </p>

            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => {
                const available = isSizeAvailable(size);
                const isSelected = selectedSize === size;

                const sizeClasses = available
                  ? isSelected
                    ? "bg-actionPrimary text-white shadow-sm"
                    : "bg-softGray2 text-textDark hover:bg-softGray3 cursor-pointer"
                  : "bg-softGray2 text-softGray3 cursor-not-allowed";

                return (
                  <button
                    key={size}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    className={`
              w-7 h-7 flex items-center justify-center text-[10px] font-medium
              rounded-md transition-all duration-150
              ${sizeClasses}
            `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-softGray1">
          <span className="text-xl text-textDark">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSize || !selectedColor}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
