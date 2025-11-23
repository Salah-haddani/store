import React, { useState, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import { PRODUCTS } from "../data/products";

const ListProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const [sortOption, setSortOption] = useState("Newest");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = PRODUCTS;

    if (activeCategory !== "All Products") {
      currentProducts = currentProducts.filter(
        (product) => product.category === activeCategory
      );
    }

    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
    }

    currentProducts.sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Newest":
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

    return currentProducts;
  }, [activeCategory, sortOption, searchTerm]);

  return (
    <MainLayout>
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setSearchTerm={setSearchTerm}
      />

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-10 text-softGray2">
          No products found matching the current filters.
        </div>
      )}

      <div
        className="mt-8 grid gap-8 
                          grid-cols-1          /* Mobile */
                          sm:grid-cols-2       /* Tablet */
                          lg:grid-cols-3       /* Adjust for layout space */
                          xl:grid-cols-4       /* Desktop */
                          "
      >
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MainLayout>
  );
};

export default ListProducts;
