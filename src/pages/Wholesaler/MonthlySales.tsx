import React from "react";

/*
 A simple visual bar-like trends block implemented with SVG / divs to avoid adding chart libs.
 Matches the design's "list with small bars" look.
*/

type Trend = { month: string; orders: number; value: string };

const trends: Trend[] = [
  { month: "Jan", orders: 95, value: "Rwf 2,400,000" },
  { month: "Feb", orders: 43, value: "Rwf 1,400,000" },
  { month: "Mar", orders: 112, value: "Rwf 1,500,000" },
  { month: "Apr", orders: 138, value: "Rwf 1,500,000" },
];

const MonthlySalesTrends: React.FC = () => {
  const maxOrders = Math.max(...trends.map((t) => t.orders));
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Monthly Sales Trends</h3>
        <a href="#" className="text-sm text-teal-600">View All</a>
      </div>

      <div className="space-y-3">
        {trends.map((t) => (
          <div key={t.month} className="flex items-center gap-3">
            <div className="w-12 text-sm">{t.month}</div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded h-3 relative overflow-hidden">
                <div
                  style={{ width: `${(t.orders / maxOrders) * 100}%` }}
                  className="h-3 bg-teal-400 rounded"
                />
              </div>
            </div>
            <div className="w-32 text-sm text-gray-600 text-right">{t.orders} orders</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySalesTrends;
