import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      {/* Left side: greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, TechWorld Distributors!
        </h1>
        <p className="text-sm text-gray-600">
          Manage your wholesale business and track your sales performance
        </p>
      </div>

      {/* Right side: notifications + profile */}
      <div className="flex items-center gap-4">
        {/* Notification button */}
        <button className="relative p-2 rounded-full bg-white shadow hover:bg-gray-50">
          <span role="img" aria-label="notifications">
            🔔
          </span>
          {/* Red dot indicator */}
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow hover:shadow-md transition">
          <img
            src="https://via.placeholder.com/36"
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
