// src/pages/wholesaler/ProductsPage.tsx
import React from "react";
import { FaBell, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Assume you have this component
import Topbar from "./Topbar"; // Assume you have this component

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  minOrder: number;
  totalSold: number;
  revenue: string;
  status: "Active" | "Low Stock" | "Out of Stock";
  image: string;
  lastUpdated: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A54",
    category: "Electronics",
    price: "Rwf 300,000",
    stock: 45,
    minOrder: 12,
    totalSold: 0,
    revenue: "Rwf 1,282,500",
    status: "Active",
    image: "/images/samsung.jpg",
    lastUpdated: "2024-01-20",
  },
  {
    id: 2,
    name: "Red Roses",
    category: "Flowers",
    price: "Rwf 2,000",
    stock: 0,
    minOrder: 40,
    totalSold: 100,
    revenue: "Rwf 130,000",
    status: "Out of Stock",
    image: "/images/rose.jpg",
    lastUpdated: "2024-01-22",
  },
  {
    id: 3,
    name: "Nutri Blender",
    category: "Electronics",
    price: "Rwf 2,200,000",
    stock: 100,
    minOrder: 15,
    totalSold: 20,
    revenue: "Rwf 20,000,000",
    status: "Active",
    image: "/images/blender.jpg",
    lastUpdated: "2024-01-23",
  },
];

const ProductsPage: React.FC = () => {
  const activeCount = products.filter(p => p.status === "Active").length;
  const lowStockCount = products.filter(p => p.status === "Low Stock").length;
  const outOfStockCount = products.filter(p => p.status === "Out of Stock").length;
  const totalSold = products.reduce((sum, p) => sum + p.totalSold, 0);

  return (
    <div className="flex min-h-screen bg-[#eaf6f4]">
      <Sidebar />
      <div className="flex-1 space-x-6 ml-66 p-6">
        <Topbar />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Products</h1>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">+ Add Product</button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <select className="border border-gray-300 rounded px-4 py-2">
            <option>All Categories</option>
          </select>
          <select className="border border-gray-300 rounded px-4 py-2">
            <option>Status</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded shadow p-4 flex flex-col">
              <img src={product.image} alt={product.name} className="h-40 object-cover rounded mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{product.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-teal-600 font-semibold mt-2">{product.price}</p>
              <div className="flex justify-between mt-2 text-gray-600 text-sm">
                <div>Stock: {product.stock}</div>
                <div>Min Order: {product.minOrder}</div>
              </div>
              <div className="flex justify-between mt-1 text-gray-600 text-sm">
                <div>Total Sold: {product.totalSold}</div>
                <div>Revenue: {product.revenue}</div>
              </div>
              <div className="text-gray-400 text-xs mt-2">Last updated: {product.lastUpdated}</div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
                  <FaBell /> View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
                  <FaEdit /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
                  <FaTrash /> Delete
                </button>
              </div>
              {product.status === "Out of Stock" && (
                <div className="mt-2 text-red-600 text-sm font-medium">Out of stock - update inventory</div>
              )}
              {product.status === "Low Stock" && (
                <div className="mt-2 text-yellow-600 text-sm font-medium">Low stock alert - Consider Restocking</div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-teal-600 font-bold text-xl">{activeCount}</p>
            <p className="text-gray-500">Active Products</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-yellow-600 font-bold text-xl">{lowStockCount}</p>
            <p className="text-gray-500">Low Stock</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-red-600 font-bold text-xl">{outOfStockCount}</p>
            <p className="text-gray-500">Out of Stock</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-teal-600 font-bold text-xl">{totalSold}</p>
            <p className="text-gray-500">Total Sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
