import React from "react";

type Item = { name: string; sold: number; revenue: string; image?: string };

const items: Item[] = [
  { name: "Samsung Galaxy A54", sold: 145, revenue: "Rwf 2,000,000", image: "https://via.placeholder.com/56" },
  { name: "NutriBullet Blender", sold: 30, revenue: "Rwf 20,000,000", image: "https://via.placeholder.com/56" },
  { name: "HP Pavilion Laptop", sold: 100, revenue: "Rwf 30,000,000", image: "https://via.placeholder.com/56" },
];

const TopPerformingProducts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Top Performing Products</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-lg bg-[#f7fffb] p-3 flex items-center gap-3">
            <img src={it.image} alt={it.name} className="w-14 h-14 rounded-md object-cover" />
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-600">{it.sold} units sold · {it.revenue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingProducts;
