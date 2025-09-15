// src/pages/Wishlist.tsx
import React from "react";
import { Heart, Star, MapPin, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const wishlistItems = [
  {
    id: 1,
    name: "Shoes",
    category: "Clothes",
    rating: 4.8,
    reviews: 124,
    seller: "Kigali Wholesaler LTD",
    price: "120,000RWF",
    oldPrice: "180,000RWF",
    image: "https://via.placeholder.com/400x300?text=Shoes",
  },
  {
    id: 2,
    name: "Shoes",
    category: "Clothes",
    rating: 4.8,
    reviews: 124,
    seller: "Kigali Wholesaler LTD",
    price: "120,000RWF",
    oldPrice: "180,000RWF",
    image: "https://via.placeholder.com/400x300?text=Shoes",
  },
  {
    id: 3,
    name: "Shoes",
    category: "Clothes",
    rating: 4.8,
    reviews: 124,
    seller: "Kigali Wholesaler LTD",
    price: "120,000RWF",
    oldPrice: "180,000RWF",
    image: "https://via.placeholder.com/400x300?text=Shoes",
  },
];

const Wishlist: React.FC = () => {
  return (
    <div className="bg-[#e6f6f7] min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-gray-500 mt-1">
          <span className="text-teal-600 font-semibold">( {wishlistItems.length} )</span> items saved for later
        </p>

        {/* Wishlist Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                  <Heart className="text-red-500 fill-red-500" size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{item.name}</h2>
                  <span className="text-xs bg-red-400 text-white px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="font-medium">{item.rating}</span>
                  <span>({item.reviews} Reviews)</span>
                </div>

                {/* Seller */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin size={16} className="text-gray-400" />
                  {item.seller}
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-3">
                  <p className="font-bold">{item.price}</p>
                  <p className="text-gray-400 line-through">{item.oldPrice}</p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex flex-col gap-3">
                  <button className="w-full border border-teal-600 text-teal-600 py-2 rounded-md font-medium hover:bg-teal-50">
                    View details
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded-md font-medium hover:bg-teal-700">
                    <ShoppingCart size={16} />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white mt-10 border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {/* Left side - logo + description */}
          <div>
            <h2 className="text-teal-600 font-bold text-lg">SokoLink</h2>
            <p className="text-gray-600 text-sm mt-2">
              Connecting wholesalers, retailers, and customers across Africa. 
              Building the future of commerce, one connection at a time.
            </p>
          </div>

          {/* Middle links */}
          <div>
            <h3 className="font-semibold mb-2">For Customers</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#">Browse Products</a></li>
              <li><a href="#">Join as Customer</a></li>
              <li><a href="#">Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">For Businesses</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#">Join as Retailer</a></li>
              <li><a href="#">Join as Wholesaler</a></li>
              <li><a href="#">Business Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About SokoLink</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap gap-6 justify-center">
          <div className="bg-white shadow rounded-lg px-6 py-3 text-center">
            <p className="text-green-600 font-bold text-xl">2,623</p>
            <p className="text-sm text-gray-500">Verified Users</p>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-3 text-center">
            <p className="text-yellow-500 font-bold text-xl">34</p>
            <p className="text-sm text-gray-500">Pending Verification</p>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-3 text-center">
            <p className="text-red-500 font-bold text-xl">12</p>
            <p className="text-sm text-gray-500">Suspended Users</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-between text-sm text-gray-500">
          <p>© 2025 SokoLink. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Wishlist;
