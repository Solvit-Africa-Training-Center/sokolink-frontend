import React from "react";

const RecentOrders: React.FC = () => {
  const orders = [
    { id: "ORD-W001", status: "Processing", store: "Sarah’s Store", items: 45, amount: "Rwf 2,400,000" },
    { id: "ORD-W002", status: "Shipped", store: "City Electronics", items: 30, amount: "Rwf 2,100,000" },
    { id: "ORD-W003", status: "Delivering", store: "Metro Retail", items: 23, amount: "Rwf 500,000" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Recent Orders</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>
      {orders.map((order, i) => (
        <div key={i} className="flex justify-between items-center p-3 border-b last:border-0">
          <div>
            <p className="font-semibold">{order.id} 
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">{order.status}</span>
            </p>
            <p className="text-sm text-gray-500">{order.store} - {order.items} items</p>
          </div>
          <p className="text-sm font-semibold">{order.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
