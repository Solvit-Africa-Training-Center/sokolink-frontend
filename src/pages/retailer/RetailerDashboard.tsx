// src/components/RetailerDashboard.tsx
import {
    LayoutDashboard,
    Search,
    ShoppingCart,
    Package,
    BarChart3,
    User,
    Bell,
    LogOut,
    Boxes,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const RetailerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node) &&
                !isSidebarOpen
            ) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="flex bg-[#F5FAFA] min-h-screen">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "w-[260px]" : "w-0"
                    } bg-white shadow-md transition-all duration-300 flex flex-col justify-between h-screen sticky top-0 z-30`}
            >
                <div>
                    <div className="p-6">
                        <img src={Logo} alt="logo" className="w-32 mx-auto" />
                    </div>

                    <nav className="flex flex-col gap-2 px-4">
                        <Link
                            to="/retailerdashboard"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <LayoutDashboard size={20} /> Dashboard
                        </Link>

                        <Link
                            to="browse"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("browse")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Boxes size={20} /> Browse Products
                        </Link>

                        <Link
                            to="search"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer/search")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Search size={20} /> Search
                        </Link>

                        <Link
                            to="orders"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer/orders")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Package size={20} /> My Orders
                        </Link>

                        <Link
                            to="track"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/track")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <ShoppingCart size={20} /> Track Order
                        </Link>

                        <Link
                            to="cart"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer/cart")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <ShoppingCart size={20} /> My Cart
                        </Link>

                        <Link
                            to="analytics"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer/analytics")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <BarChart3 size={20} /> Analytics
                        </Link>

                        <Link
                            to="profile"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("/retailer/profile")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <User size={20} /> Profile
                        </Link>

                        <Link
                            to="notifications"
                            className={`flex items-center gap-3 p-2 rounded-md ${isActive("notifications")
                                    ? "bg-[#B0DADE] text-[#008994]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Bell size={20} /> Notifications
                        </Link>
                    </nav>
                </div>

                <div className="px-4 py-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-500 hover:bg-gray-100 p-2 rounded-md w-full"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-h-screen">
                {/* Topbar */}
                <div className="bg-white px-6 py-3 shadow-sm sticky top-0 flex justify-between items-center z-40">
                    <h2 className="font-semibold text-gray-700">Retailer Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <Bell className="cursor-pointer" />
                        <img
                            src="https://plus.unsplash.com/premium_vector-1682269284255-8209b981c625?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D"
                            alt="profile"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RetailerDashboard;
