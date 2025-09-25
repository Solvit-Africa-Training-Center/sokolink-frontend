import React from "react";
import { Link } from "react-router-dom";

type Order = {
  id: string;
  store: string;
  date: string;
  items: number;
  value: string;
  status: "Processing" | "Shipped" | "Delivering" | "Completed";
};

const sampleOrders: Order[] = [
  { id: "ORD-W001", store: "Sarah's Store", date: "2025-09-18", items: 45, value: "Rwf 2,400,000", status: "Processing" },
  { id: "ORD-W002", store: "City Electronics", date: "2025-09-17", items: 30, value: "Rwf 2,100,000", status: "Shipped" },
  { id: "ORD-W003", store: "Metro Retail", date: "2025-09-15", items: 23, value: "Rwf 500,000", status: "Delivering" },
];

const statusClasses = (s: Order["status"]) =>
  s === "Processing"
    ? "bg-yellow-100 text-yellow-700"
    : s === "Shipped"
    ? "bg-blue-100 text-blue-700"
    : s === "Delivering"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-700";

const RecentOrders: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Recent Orders</h2>
        <Link to="/wholesaler/orders" className="text-sm text-teal-600">View All</Link>
      </div>

      <div className="space-y-3">
        {sampleOrders.map((o) => (
          <div key={o.id} className="rounded-lg bg-[#f7fffb] p-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{o.id}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${statusClasses(o.status)}`}>{o.status}</div>
              </div>
              <div className="text-sm text-gray-600">{o.store}</div>
              <div className="text-xs text-gray-400">{o.date} · {o.items} items · {o.value}</div>
            </div>
            <div className="text-sm text-teal-600">View</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
