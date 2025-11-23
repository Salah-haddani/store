import React, { useState } from "react";
import { Search, ChevronDown, Filter, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CATEGORY_TAGS = ["All Products", "Men", "Women", "Kids", "Accessories"];
const MAIN_FILTER_OPTIONS = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

const FilterDropdown = ({
  options,
  title = "Sort By",
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left z-10">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-lg border border-softGray2 bg-white px-4 py-2 text-sm font-medium text-textDark hover:bg-softGray1 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected || title}
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  selected === option
                    ? "bg-actionPrimary text-white"
                    : "text-textDark hover:bg-softGray1"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({
  activeCategory,
  setActiveCategory,
  sortOption,
  setSortOption,
  setSearchTerm,
}) => {
  const { toggleCart } = useCart();
  const [secondaryFilter, setSecondaryFilter] = useState("Recommended");

  const handleMainSortChange = (option) => {
    setSortOption(option);
  };

  const handleCategoryChange = (tag) => {
    setActiveCategory(tag);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="sticky top-0 bg-white p-4 shadow-sm z-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="text-3xl  text-textDark whitespace-nowrap">
          List Products
        </h1>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearchChange}
              className="input-base w-full !pl-8 pr-4 py-2 text-sm"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-softGray2" />
          </div>

          <FilterDropdown
            options={MAIN_FILTER_OPTIONS}
            selected={sortOption}
            setSelected={handleMainSortChange}
          />

          <button
            onClick={toggleCart}
            className="relative p-2 bg-softGray1 rounded-full hover:bg-softGray2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-textDark" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center overflow-x-auto border-t border-softGray1 pt-4">
        <div className="flex space-x-3 pb-2 flex-shrink-0">
          {CATEGORY_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleCategoryChange(tag)}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${
                  activeCategory === tag
                    ? "bg-actionPrimary text-white shadow-md"
                    : "bg-softGray1 text-textDark hover:bg-softGray2"
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
