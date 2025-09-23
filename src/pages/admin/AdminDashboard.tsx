// src/components/AdminDashboard.tsx
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
import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.svg";
import { logout, selectCurrentUser } from "../../slices/authSlice";
import { useGetAdminWholesalersQuery, useGetRetailersQuery } from '../../services/api/sokoLinkApi';

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

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authSlice = useSelector(selectCurrentUser);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const getLocalAuth = (): { user?: User | null; token?: string | null } => {
    try {
      const raw = localStorage.getItem("adminAuthData");
      if (!raw) return { user: null, token: null };
      return JSON.parse(raw);
    } catch {
      return { user: null, token: null };
    }
  };

  const profile = (authSlice && (authSlice.user as User)) ?? getLocalAuth().user ?? null;

  const [profileUrl] = useState(
    "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.webp?a=1&b=1&s=612x612&w=0&k=20&c=A6siQX4l6CdMPyXf8dxR1rgIP8yeWr5LC83H0gWGIGA="
  );

  // --- Notifications ---
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [unseenNotifications, setUnseenNotifications] = useState<any[]>([]);
  const [isNewNotification, setIsNewNotification] = useState(false);

  // --- RTK Query polling ---
  const { data: wholesalers } = useGetAdminWholesalersQuery(undefined, { pollingInterval: 30000 });
  const { data: retailers } = useGetRetailersQuery(undefined, { pollingInterval: 30000 });

  useEffect(() => {
    const combinedUsers = [
      ...(wholesalers ?? []).map((w) => ({ ...w, role: 'Wholesaler' })),
      ...(retailers ?? []).map((r) => ({ ...r, role: 'Retailer' })),
    ];

    setAllNotifications(combinedUsers);

    // determine unseen (new) ones
    const newUnseen = combinedUsers.filter(
      (user) => !allNotifications.some((n) => n.id === user.id)
    );
    if (newUnseen.length > 0) {
      setIsNewNotification(true);
      setUnseenNotifications((prev) => [...prev, ...newUnseen]);
    }
  }, [wholesalers, retailers]);

  // --- Resize Handling ---
  useEffect(() => {
    function onResize() {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --- Sidebar Open State Based on Path ---
  useEffect(() => {
    const path = location.pathname;
    if (
      path.includes("/admin/users") ||
      path.includes("/admin/verification") ||
      path.includes("/admin/kycreview")
    ) setIsUsersOpen(true);
    if (
      path.includes("/admin/productspage") ||
      path.includes("/admin/categories") ||
      path.includes("/admin/inventory")
    ) setIsProductsOpen(true);
    if (!isDesktop) setIsSidebarOpen(false);
  }, [location.pathname, isDesktop]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login", { replace: true });
  };

  const isActivePath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const isSubPathActive = (path: string) => location.pathname === path;

  // --- Click Outside Handlers ---
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (isProfileOpen && profileRef.current && !profileRef.current.contains(target)) setIsProfileOpen(false);
      if (!isSidebarOpen || isDesktop) return;
      if ((e.target as HTMLElement).closest("[data-sidebar-toggle]")) return;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) setIsSidebarOpen(false);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isSidebarOpen, isDesktop, isProfileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isProfileOpen) setIsProfileOpen(false);
        if (!isDesktop && isSidebarOpen) setIsSidebarOpen(false);
        if (isNotificationOpen) setIsNotificationOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isDesktop, isSidebarOpen, isProfileOpen, isNotificationOpen]);

  useEffect(() => {
    if (!isDesktop && isSidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isDesktop, isSidebarOpen]);

  return (
    <div className="flex bg-[#e1f1f1] min-h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "w-[300px] px-[10px] py-[40px]" : "w-0 px-0 py-[20px]"} shadow max-h-screen overflow-y-auto custom-scrollbar bg-white transition-all duration-300 sticky top-0 left-0 flex flex-col justify-between z-30`}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex gap-3 justify-between flex-col">
          <div className={isSidebarOpen ? "block" : "hidden"}>
            <img src={Logo} alt="Logo" className="w-[160px]" />
          </div>

          {isSidebarOpen && (
            <div className="mt-10 flex flex-col gap-2">
              {/* Dashboard */}
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

              {/* Reports */}
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

              {/* Analytics */}
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

                <div className={`ml-5 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isUsersOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                  <Link
                    to="/admin/users"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/users")
                      ? "text-[#008994] font-medium"
                      : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Wholesalers
                  </Link>
                  <Link
                    to="/admin/users/retailers"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/verification")
                      ? "text-[#008994] font-medium"
                      : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Retailers
                  </Link>
                  <Link
                    to="/admin/kycreview"
                    className={`py-1 transition-colors duration-200 ${isSubPathActive("/admin/kycreview")
                      ? "text-[#008994] font-medium"
                      : "text-gray-700 hover:text-[#008994]"
                      }`}
                  >
                    Customers
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

                <div className={`ml-5 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isProductsOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}>
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
      <div className="flex-1 min-h-screen">
        <div className="bg-white px-4 md:px-6 py-3 shadow-sm sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              data-sidebar-toggle
              onClick={(e) => { e.stopPropagation(); setIsSidebarOpen((s) => !s); }}
              className="p-2 rounded-md md:hidden"
              aria-label="Toggle menu"
            >
              <Menu />
            </button>

            <button
              data-sidebar-toggle
              onClick={(e) => { e.stopPropagation(); setIsSidebarOpen((s) => !s); }}
              className="p-2 rounded-md hidden md:inline-flex"
              aria-label="Toggle sidebar"
            >
              <Menu />
            </button>
          </div>

          <div className="flex gap-[18px] items-center justify-center relative">
            {/* Notifications */}
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setIsNotificationOpen((s) => !s);
                setIsNewNotification(false);
                setUnseenNotifications([]);
              }}
            >
              <BellIcon />
              {isNewNotification && (
                <span className="h-[12px] w-[12px] bg-[#EB2A2A] rounded-full absolute bottom-0 right-[-3px] top-[-2px]"></span>
              )}

              {isNotificationOpen && (
                <div className="p-2 bg-white border border-gray-200 rounded-md shadow-md absolute top-[50px] right-0 w-[300px] z-10">
                  <div className="flex items-center justify-between p-2">
                    <span className="font-bold">Notifications</span>
                    <span className="text-[#008994] cursor-pointer">See all</span>
                  </div>
                  <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allNotifications.length === 0 ? (
                      <span className="text-gray-500 text-sm">No registrations</span>
                    ) : (
                      allNotifications.map((n) => (
                        <div key={n.id} className="text-sm text-gray-700">
                          {n.role} registered: {n.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile avatar & popover */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={(e) => { e.stopPropagation(); setIsProfileOpen((s) => !s); }}
                className="flex items-center gap-2 cursor-pointer"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <img
                  src={(profile as User)?.avatar || profileUrl}
                  className="h-8 w-8 rounded-full object-cover right-0"
                  alt="Profile"
                />
                <span className="hidden md:inline-block text-sm text-gray-700 ">
                  {(profile as User)?.name ?? "Admin"}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white outline outline-gray-100  rounded-md shadow-lg p-4 z-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={(profile as User)?.avatar || profileUrl}
                      alt="avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{(profile as User)?.name ?? "Admin"}</div>
                      <div className="text-sm text-gray-500">{(profile as User)?.email ?? "—"}</div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-3">
                    <Link to="/admin/profile" className="block px-2 py-1 text-sm text-gray-700 hover:text-[#008994]">View profile</Link>
                    <button onClick={handleLogout} className="mt-2 w-full text-left px-2 py-1 text-sm text-red-600 hover:text-red-700">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>

      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
