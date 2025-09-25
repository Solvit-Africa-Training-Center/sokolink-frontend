import React from "react";

type Stock = { name: string; current: number; min: number };

const lowStocks: Stock[] = [
  { name: "iPhone 13 Pro", current: 3, min: 10 },
  { name: "DELL Laptop XPS", current: 3, min: 10 },
  { name: "Samsung TV 55\"", current: 1, min: 10 },
];

const LowStockAlerts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Low Stock Alerts</h4>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lowStocks.map((l) => (
          <div key={l.name} className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{l.name}</div>
              <div className="text-xs px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-700">Low Stock</div>
            </div>
            <div className="text-xs text-gray-600 mb-3">Current: {l.current} · Min: {l.min}</div>
            <button className="w-full rounded-md px-3 py-2 bg-white border text-sm">Restock Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlerts;
