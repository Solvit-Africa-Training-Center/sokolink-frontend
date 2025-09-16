import React from "react";
import { LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-white shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-xl font-bold text-sky-600">SokoLink</h1>
        <nav className="mt-6 space-y-4">
          <a className="block text-gray-700 hover:text-sky-600">Dashboard</a>
          <a className="block text-gray-700 hover:text-sky-600">My Products</a>
          <a className="block text-gray-700 hover:text-sky-600">Add Product</a>
          <a className="block text-gray-700 hover:text-sky-600">Orders</a>
          <a className="block text-gray-700 hover:text-sky-600">Track Orders</a>
          <a className="block text-gray-700 hover:text-sky-600">Analytics</a>
          <a className="block text-gray-700 hover:text-sky-600">Verification</a>
          <a className="block text-gray-700 hover:text-sky-600">Profile</a>
          <a className="block text-gray-700 hover:text-sky-600">Notifications</a>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
