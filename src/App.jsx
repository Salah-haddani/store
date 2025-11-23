import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ListProducts from "./pages/ListProducts.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ListProducts />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-softGray1">
    <div className="text-center">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-2xl text-textDark mt-4">Page Not Found</p>
      <p className="text-softGray2 mt-2">The requested URL does not exist.</p>
      <a
        href="/"
        className="mt-6 inline-block text-actionPrimary hover:text-actionSecondary transition-colors"
      >
        Go to Home
      </a>
    </div>
  </div>
);

export default App;
