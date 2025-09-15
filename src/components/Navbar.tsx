import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import images from "../data/images";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 👈 backend sets this after login

  const handleWishlistClick = () => {
    if (role === "retailer") {
      navigate("/wishlist"); // ✅ go to wishlist
    } else {
      navigate("/login"); // ✅ go to login if not retailer
    }
  };

  return (
    <header className="sticky w-full bg-white z-50 left-0 top-0 flex items-center justify-between px-8 py-4 border-b border-[#d4d4d4]">
      <div className="flex items-center">
        <Link to="/">
          <img src={images[0]} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center justify-between w-[600px]">
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#products" className="hover:text-teal-600">Products</a>
          <Link to="/about" className="hover:text-teal-600">About</Link>
          <Link to="/contact" className="hover:text-teal-600">Contact</Link>
          <Link to="/help">Help</Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* ✅ Heart always visible */}
          <button
            onClick={handleWishlistClick}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Heart size={20} className="text-red-500" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart size={20} />
          </button>
        </div>
        <Link
          to="/signup"
          className="bg-teal-500 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-600"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
