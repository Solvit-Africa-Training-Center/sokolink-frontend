import {
  ChevronRightIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  Users2Icon,
  BoxIcon,
  Menu,
  ChartNoAxesColumnIcon,
  FileTextIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.svg";
import { logout, selectCurrentUser } from "../../slices/authSlice";

// Define User type for avatar
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function AdminDashboard() {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNewNotification, setIsNewNotification] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(selectCurrentUser);

  const [profileUrl] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
  );

  useEffect(() => {
    const path = location.pathname;

    if (
      path.includes("/admin/users") ||
      path.includes("/admin/verification") ||
      path.includes("/admin/kycreview")
    ) {
      setIsUsersOpen(true);
    }

    if (
      path.includes("/admin/productspage") ||
      path.includes("/admin/categories") ||
      path.includes("/admin/inventory")
    ) {
      setIsProductsOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login", { replace: true });
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isSubPathActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex bg-[#e1f1f1]">
      {/* Sidebar */}
      <div
        className={
          isSidebarOpen
            ? "w-[300px] shadow max-h-screen px-[10px] py-[40px] overflow-y-auto custom-scrollbar bg-white transition-all duration-300 sticky top-0 left-0 flex flex-col justify-between"
            : "w-0 shadow max-h-screen px-0 py-[20px] overflow-hidden bg-white transition-all duration-300 sticky top-0 left-0"
        }
      >
        <div className="flex gap-3 justify-between flex-col">
          {/* Logo */}
          <div className={isSidebarOpen ? "block" : "hidden"}>
            <img src={Logo} alt="Logo" className="w-[160px]" />
          </div>

          {isSidebarOpen && (
            <div className="mt-10 flex flex-col gap-2">
              <Link
                to="/admin"
                className={`flex gap-3 p-2 items-center rounded-[8px] transition-colors duration-200 ${isActivePath("/admin") &&
                    !isActivePath("/admin/users") &&
                    !isActivePath("/admin/productspage")
                    ? "bg-[#B0DADE] text-[#008994]"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <LayoutDashboardIcon size={20} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/reports"
                className={`flex gap-3 p-2 items-center rounded-[8px] transition-colors duration-200 ${isActivePath("/admin/reports")
                    ? "bg-[#B0DADE] text-[#008994]"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <FileTextIcon size={20} />
                <span>Reports</span>
              </Link>

              <Link
                to="/admin/analytics"
                className={`flex gap-3 p-2 items-center rounded-[8px] transition-colors duration-200 ${isActivePath("/admin/analytics")
                    ? "bg-[#B0DADE] text-[#008994]"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <ChartNoAxesColumnIcon size={20} />
                <span>Analytics</span>
              </Link>

              {/* Users Dropdown */}
              <div className="cursor-pointer">
                <div
                  className={`flex gap-3 p-2 items-center rounded-[8px] transition-colors duration-200 ${isActivePath("/admin/users") ||
                      isActivePath("/admin/verification") ||
                      isActivePath("/admin/kycreview")
                      ? "bg-[#B0DADE] text-[#008994]"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                  onClick={() => setIsUsersOpen(!isUsersOpen)}
                >
                  <Users2Icon size={20} />
                  <span className="mr-auto">Users</span>
                  <div className="transition-transform duration-200 transform">
                    {isUsersOpen ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                  </div>
                </div>

                {/* Dropdown menus */}
                <div
                  className={`ml-5 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isUsersOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <Link
                    to="/admin/users"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/users")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    All users
                  </Link>
                  <Link
                    to="/admin/verification"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/verification")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Verification Queue
                  </Link>
                  <Link
                    to="/admin/kycreview"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/kycreview")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    KYC Review
                  </Link>
                </div>
              </div>

              {/* Products Dropdown */}
              <div className="cursor-pointer">
                <div
                  className={`flex gap-3 p-2 items-center rounded-[8px] transition-colors duration-200 ${isActivePath("/admin/productspage") ||
                      isActivePath("/admin/categories") ||
                      isActivePath("/admin/inventory")
                      ? "bg-[#B0DADE] text-[#008994]"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <BoxIcon size={20} />
                  <span className="mr-auto">Products</span>
                  <div className="transition-transform duration-200 transform">
                    {isProductsOpen ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                  </div>
                </div>

                <div
                  className={`ml-5 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isProductsOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <Link
                    to="/admin/productspage"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/productspage")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/admin/categories"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/categories")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Categories
                  </Link>
                  <Link
                    to="/admin/inventory"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/inventory")
                        ? "text-[#008994] font-medium"
                        : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Inventory
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex gap-3 p-2 items-center rounded-[8px] text-[#FF6F61] hover:bg-gray-100 transition-colors duration-200"
        >
          <LogOutIcon size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-20 flex items-center justify-between">
          <Menu className="cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          <div className="flex gap-[18px] items-center justify-center">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <BellIcon />
              {isNewNotification && (
                <span className="h-[12px] w-[12px] bg-[#EB2A2A] rounded-full absolute bottom-0 right-[-3px] top-[-2px]"></span>
              )}
              {isNotificationOpen && (
                <div className="p-2 bg-white border border-gray-200 rounded-md shadow-md absolute top-[50px] right-0 w-[300px] z-10">
                  <div className="flex items-center flex-col justify-between p-2">
                    <span className="font-bold">Notifications</span>
                    <span className="text-[#008994]">See all</span>
                  </div>
                </div>
              )}
            </div>

            {isSidebarOpen && (
              <Link to="/admin/profile" className="relative cursor-pointer">
                <img
                  src={(auth.user as User)?.avatar || profileUrl}
                  className="h-8 w-8 rounded-full object-cover right-0"
                  alt="Profile"
                />
                <span className="h-[12px] w-[12px] bg-[#08DA24] rounded-full absolute bottom-0 right-[-6px] top-[5px]"></span>
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
