import React from "react";
import MainLayout from "../layout/MainLayout";
import ProductCard from "../components/ProductCard/ProductCard";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";

const ProductSlider = ({ products, title }) => {
  return (
    <section className="py-12 bg-white rounded-xl shadow-sm px-6">
      <h2 className="h2 mb-8 text-center">{title}</h2>{" "}
      <div className="flex justify-center overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-72">
            {" "}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  const trendingProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-12">
        {" "}
        <section className="relative bg-gradient-to-br from-sidebarBg to-white rounded-2xl p-8 sm:p-12 lg:p-20 text-center shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 bg-actionPrimary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-actionSecondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 h-48 bg-softGray2 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="h1 text-textDark mb-4">
              Discover Your Next Favorite Style
            </h1>{" "}
            <p className="text-xl text-textDark/80 mb-8 max-w-2xl mx-auto">
              Explore our curated collection of modern fashion, designed for
              comfort and elegance.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl">
                Shop Men's
              </button>
              <button className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-actionPrimary text-actionPrimary hover:bg-actionPrimary hover:text-white transition-colors">
                Shop Women's
              </button>
            </div>
          </div>
        </section>
        <section className="py-12 px-6">
          <h2 className="h2 mb-10 text-center">Featured Categories</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`/products`}
                className="card-base flex flex-col items-center p-6 text-center hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
                />
                <h3 className="h3 text-textDark mb-2">{category.name}</h3>{" "}
                <p className="caption text-center">{category.description}</p>{" "}
              </a>
            ))}
          </div>
        </section>
        <ProductSlider products={trendingProducts} title="Trending Now" />
        <section className="relative bg-actionPrimary text-white rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="bg-pattern-dots absolute inset-0 opacity-10"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">
              Unlock Exclusive Savings!
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Sign up for our newsletter today and get 15% off your first
              purchase. Don't miss out!
            </p>
            <div className="flex justify-center">
              <button className="btn-primary bg-white text-actionPrimary hover:bg-softGray1 px-8 py-3 text-lg font-semibold shadow-lg">
                Get Your Discount
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
