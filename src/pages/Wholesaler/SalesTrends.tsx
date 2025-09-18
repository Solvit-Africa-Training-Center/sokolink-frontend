import React from "react";

const SalesTrends: React.FC = () => {
  const sales = [
    { month: "Jan", orders: 95, revenue: "Frw 2,400,000" },
    { month: "Feb", orders: 43, revenue: "Frw 1,400,000" },
    { month: "Mar", orders: 112, revenue: "Frw 1,500,000" },
    { month: "Apr", orders: 138, revenue: "Frw 1,500,000" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Monthly Sales Trends</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>
      {sales.map((m, i) => (
        <div key={i} className="flex justify-between p-3 border-b last:border-0">
          <p>{m.month} ({m.orders} orders)</p>
          <p className="font-semibold">{m.revenue}</p>
        </div>
      ))}
    </div>
  );
};

export default SalesTrends;
