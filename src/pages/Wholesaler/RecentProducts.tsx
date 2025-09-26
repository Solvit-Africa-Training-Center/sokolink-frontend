import React from "react";

const RecentProducts: React.FC = () => {
  const products = [
    { product: "Samsung Galaxy A54", stock: 23 },
    { product: "iPhone 13 Pro", stock: 8 },
    { product: "Apple Macbooks", stock: 12 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Recent Orders</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>
      {products.map((item, i) => (
        <div key={i} className="flex justify-between items-center p-3 border-b last:border-0">
          <p className="font-semibold">{item.product}</p>
          <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">{item.stock} in stock</span>
        </div>
      ))}
    </div>
  );
};

export default RecentProducts;
