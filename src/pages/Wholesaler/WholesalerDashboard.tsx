import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCard from "./StatsCard";
import RecentOrders from "./RecentOrders";
import RecentProducts from "./RecentProducts";
import SalesTrends from "./SalesTrends";
import TopProducts from "./TopProducts";

const WholesalerDashboard: React.FC = () => {
  const stats = [
    { label: "Total Revenue", value: "Rwf 2,450,000", change: "+12.5%", icon: "$" },
    { label: "Total Orders", value: "1,247", change: "+8.3%", icon: "🛒" },
    { label: "Total Customers", value: "892", change: "+15.2%", icon: "👥" },
    { label: "Avg Order Value", value: "Rwf 2500", change: "-2.1%", icon: "📦" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <Topbar />

        <div>
          <h2 className="text-xl font-bold">Welcome back, TechWorld Distributors!</h2>
          <p className="text-gray-500">Manage your wholesale business and track your sales performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatsCard key={i} {...s} />
          ))}
        </div>

        {/* Recent Orders + Recent Products */}
        <div className="grid grid-cols-2 gap-6">
          <RecentOrders />
          <RecentProducts />
        </div>

        {/* Sales Trends + Top Products */}
        <div className="grid grid-cols-2 gap-6">
          <SalesTrends />
          <TopProducts />
        </div>
      </main>
    </div>
  );
};

export default WholesalerDashboard;
