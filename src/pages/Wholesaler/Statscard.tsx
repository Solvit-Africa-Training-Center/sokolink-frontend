import React from "react";

interface StatsCardProps {
  icon: string;
  value: string;
  label: string;
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label, change }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center">
        <span className="text-3xl">{icon}</span>
        <span className={`text-sm font-semibold ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
          {change}
        </span>
      </div>
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default StatsCard;
