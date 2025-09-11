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
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../../assets/logo.svg"

function AdminDashboard() {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [profileUrl] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D')
  const [isnewNotification, setIsNewNotification] = useState(true);
  const [isNotificationOpn, setIsNotificationOpen] = useState(false);

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
            <img src={Logo} alt="" className="w-[160px]" />
          </div>
          {/* Logo end */}

          {isSidebarOpen && (
            <div className="mt-10 flex flex-col gap-2">
              <Link
                to="/admin"
                className="flex gap-3 p-2 bg-[#B0DADE] items-center rounded-[8px] text-[#008994]"
              >
                <LayoutDashboardIcon size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="reports"
                className="flex gap-3 p-2  items-center rounded-[8px]  text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <FileTextIcon size={20} />
                <span>Reports</span>
              </Link>
              <Link
                to="analytics"
                className="flex gap-3 p-2  items-center rounded-[8px]  text-gray-600 hover:bg-gray-100 transition-colors duration-200 "
              >
                <ChartNoAxesColumnIcon size={20} />
                <span>Analytics</span>
              </Link>

              {/* Users Dropdown */}
              <div className="cursor-pointer">
                <div
                  className="flex gap-3 p-2 items-center rounded-[8px] text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsUsersOpen(!isUsersOpen)}
                >
                  <Users2Icon size={20} />
                  <span className="mr-auto">Users</span>
                  <div className="transition-transform duration-200 transform">
                    {isUsersOpen ? (
                      <ChevronDownIcon size={16} />
                    ) : (
                      <ChevronRightIcon size={16} />
                    )}
                  </div>
                </div>

                {/* Dropdown menus with animation */}
                <div
                  className={`
                  ml-5 flex flex-col gap-1 mt-1 overflow-hidden
                  transition-all duration-300 ease-in-out
                  ${isUsersOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                  <Link
                    to="users"
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    All users
                  </Link>
                  <Link
                    to="verification"
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    Verification Queue
                  </Link>
                  <Link
                    to="kycreview"
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    KYC Review
                  </Link>
                </div>
              </div>

              {/* Products Dropdown */}
              <div className="cursor-pointer">
                <div
                  className="flex gap-3 p-2 items-center rounded-[8px] text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <BoxIcon size={20} />
                  <span className="mr-auto">Products</span>
                  <div className="transition-transform duration-200 transform">
                    {isProductsOpen ? (
                      <ChevronDownIcon size={16} />
                    ) : (
                      <ChevronRightIcon size={16} />
                    )}
                  </div>
                </div>

                {/* Dropdown menus with animation */}
                <div
                  className={`
                  ml-5 flex flex-col gap-1 mt-1 overflow-hidden
                  transition-all duration-300 ease-in-out
                  ${isProductsOpen
                      ? "max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                    }
                `}
                >
                  <Link
                    to=""
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    All Products
                  </Link>
                  <Link
                    to=""
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    Categories
                  </Link>
                  <Link
                    to=""
                    className="text-gray-700 py-1 hover:text-[#008994] transition-colors duration-200"
                  >
                    Inventory
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <Link
          to="/admin"
          className="flex gap-3 p-2 items-center rounded-[8px] text-[#FF6F61]"
        >
          <LogOutIcon size={20} />
          <span>Logout</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* TopBar */}
        <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-20 flex items-center justify-between">
          <Menu
            className="cursor-pointer"
            onClick={() => setIsSideBarOpen(!isSidebarOpen)}
          />

          {/* Right side */}
          <div className="flex gap-[18px] items-center justify-center">
            <div className="relative cursor-pointer" onClick={() => {
              setIsNotificationOpen(!isNotificationOpn)
            
            }}>
              <BellIcon />
              {isnewNotification && (<span className="h-[12px] w-[12px] bg-[#EB2A2A] rounded-full absolute bottom-0 right-[-3px] top-[-2px]"></span>)}
              {/* Notifications */}
              {isNotificationOpn && <div className="p-2 bg-white border border-gray-200 rounded-md shadow-md absolute top-[50px] right-0 w-[300px] z-10">
                <div className="flex items-center flex-col justify-between p-2">
                  <span className="font-bold">Notifications</span>
                  <span className="text-[#008994]">See all</span>
                </div>

              </div>}
            </div>
            {isSidebarOpen && <Link to='' className="relative cursor-pointer">
              <img src={profileUrl} className="h-8 w-8 rounded-full object-cover right-0" alt="" />
              {/* Active state */}
              <span className="h-[12px] w-[12px] bg-[#08DA24] rounded-full absolute bottom-0 right-[-6px] top-[5px]"></span>
            </Link>}
         </div>
        </div>

        {/* Main content area */}
        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
