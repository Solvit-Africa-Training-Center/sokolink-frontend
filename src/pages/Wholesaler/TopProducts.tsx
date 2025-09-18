import React from "react";

const TopProducts: React.FC = () => {
  const products = [
    { product: "Samsung Galaxy A54", sold: 145, revenue: "Frw 2,000,000", img: "https://via.placeholder.com/40" },
    { product: "NutriBullet Blender", sold: 30, revenue: "Frw 20,000,000", img: "https://via.placeholder.com/40" },
    { product: "HP Pavilion Laptop", sold: 100, revenue: "Frw 30,000,000", img: "https://via.placeholder.com/40" },
    { product: "Nike Air Force 1 Sneakers", sold: 60, revenue: "Frw 3,000,000", img: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Top Performing Products</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>
      {products.map((p, i) => (
        <div key={i} className="flex items-center justify-between p-3 border-b last:border-0">
          <div className="flex items-center gap-3">
            <img src={p.img} alt={p.product} className="w-10 h-10 rounded"/>
            <div>
              <p className="font-semibold">{p.product}</p>
              <p className="text-sm text-gray-500">{p.sold} units sold</p>
            </div>
          </div>
          <p className="font-semibold">{p.revenue}</p>
        </div>
      ))}
    </div>
  );
};

export default TopProducts;
