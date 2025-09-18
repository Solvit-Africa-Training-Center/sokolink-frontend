import React from "react";
import { Bell } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Wholesaler Dashboard</h1>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-500 cursor-pointer" size={22}/>
        <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full"/>
      </div>
    </div>
  );
};

export default Header;
