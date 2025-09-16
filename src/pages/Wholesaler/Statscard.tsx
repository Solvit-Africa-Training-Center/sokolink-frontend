import React from "react";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,245",
    icon: ShoppingCart,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Revenue",
    value: "$52,430",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Products",
    value: "320",
    icon: Package,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Customers",
    value: "875",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
];

const StatsCards: React.FC = () => {
  return (
    <>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow p-4 flex items-center gap-4"
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.color}`}
          >
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatsCards;
