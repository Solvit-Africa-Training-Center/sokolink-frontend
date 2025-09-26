import React from "react";
import Sidebar from "../../pages/Wholesaler/Sidebar";
import Topbar from "../../pages/Wholesaler/Topbar";
import StatsCard from "../../pages/Wholesaler/Statcard";
import RecentOrders from "../../pages/Wholesaler/RecentOrders";
import TopProducts from "../../pages/Wholesaler/TopProducts";
import MonthlySalesTrends from "../../pages/Wholesaler/MonthlySales";
import TopPerformingProducts from "../../pages/Wholesaler/TopPerfomingProducts";
import LowStockAlerts from "../../pages/Wholesaler/LowStockAlerts";
import Footer from "../../components/Footer";

const WholesalerDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-[#eaf6f4]">
        <div className="max-w-7xl mx-auto p-6">
          <Topbar />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatsCard label="Total Revenue" value="Rwf 2,450,000" delta="+12.5%" />
            <StatsCard label="Total Orders" value="1,247" delta="+8.3%" />
            <StatsCard label="Total Customers" value="892" delta="+15.2%" />
            <StatsCard label="Avg Order Value" value="Rwf 2500" delta="-2.1%" />
          </div>

          {/* Orders + Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <RecentOrders />
            <TopProducts />
          </div>

          {/* Trends + Top Performing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MonthlySalesTrends />
            <TopPerformingProducts />
          </div>

          {/* Low Stock */}
          <div className="mb-6">
            <LowStockAlerts />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default WholesalerDashboard;
