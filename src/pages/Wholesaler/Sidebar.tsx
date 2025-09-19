import React from "react";
import { 
  LayoutDashboard, Package, PlusSquare, ClipboardList, Truck, 
  BarChart3, ShieldCheck, User, Bell, LogOut 
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 flex items-center gap-2 font-bold text-xl">
        <span className="bg-teal-600 text-white px-2 py-1 rounded">S</span>
        SokoLink
      </div>
      <nav className="flex-1 p-4 space-y-2 text-gray-700">
        <a className="flex items-center gap-3 p-2 rounded-lg bg-teal-50 text-teal-700 font-semibold" href="#">
          <LayoutDashboard size={20}/> Dashboard
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <Package size={20}/> My Products
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <PlusSquare size={20}/> Add Product
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <ClipboardList size={20}/> Orders
        </a>
       
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <BarChart3 size={20}/> Analytics
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <ShieldCheck size={20}/> Verification
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <User size={20}/> Profile
        </a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" href="#">
          <Bell size={20}/> Notifications
        </a>
      </nav>
      <button className="flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 border-t">
        <LogOut size={20}/> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
