// src/components/Wholesaler/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Box,
  PlusSquare,
  ShoppingCart,
  DollarSign,
  BarChart2,
  FileCheck,
  User,
  Bell,
  LogOut,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Dashboard", path: "/wholesaler/dashboard", icon: <LayoutGrid size={20} /> },
    { name: "My Products", path: "/wholesaler/products", icon: <Box size={20} /> },
    { name: "Add Product", path: "/wholesaler/addproduct", icon: <PlusSquare size={20} /> },
    { name: "Orders", path: "/wholesaler/orders", icon: <ShoppingCart size={20} /> },
    { name: "Payments", path: "/wholesaler/payments", icon: <DollarSign size={20} /> },
    { name: "Analytics", path: "/wholesaler/analytics", icon: <BarChart2 size={20} /> },
    { name: "Verification", path: "/wholesaler/verification", icon: <FileCheck size={20} /> },
    { name: "Profile", path: "/wholesaler/profile", icon: <User size={20} /> },
    { name: "Notifications", path: "/wholesaler/notifications", icon: <Bell size={20} /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white  shadow-sm flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="h-10 w-10 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-lg font-semibold">SokoLink</span>
        </div>

        {/* Menu */}
        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                  isActive ? "bg-teal-50 text-teal-600 font-medium" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-6 py-4">
        <button className="flex items-center gap-3 text-red-500 hover:text-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
