import React from "react";

type Product = {
  name: string;
  sold: number;
  revenue: string;
  stock?: number;
};

const products: Product[] = [
  { name: "Samsung Galaxy A54", sold: 45, revenue: "Rwf 2,400,000", stock: 23 },
  { name: "iPhone 13 Pro", sold: 35, revenue: "Rwf 2,400,000", stock: 8 },
  { name: "MacBook Pro 14\"", sold: 12, revenue: "Rwf 40,000,000", stock: 5 },
];

const TopProducts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Top Selling Products</h2>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-lg bg-[#f7fffb] p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-400">{p.sold} sold · {p.revenue}</div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600">{p.stock} in stock</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
