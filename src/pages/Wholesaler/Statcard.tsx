import React from "react";

interface StatsCardProps {
  label: string;
  value: string;
  delta?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, delta }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-xl font-semibold mt-1">{value}</div>
        </div>
        {delta && (
          <div className="text-sm rounded-md px-2 py-1 bg-[#e6fbf8] text-teal-700 font-semibold">
            {delta}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
