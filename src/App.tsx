// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgotpassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Overview from "./pages/admin/Overview";
import Reports from "./pages/admin/Reports";
import Analytics from "./pages/admin/Analytics";
import Users from "./pages/admin/Users";
import AllUsers from "./pages/admin/AllUsers";
import Products from "./pages/Products";
import AdminProducts from "./pages/admin/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./pages/PrivateRoute";
import ProductModeration from "./pages/admin/ProductModeration";
import Retailers from "./pages/admin/Retailers";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import Dashboard from "./pages/retailer/Dashboard";
import BrowseProducts from "./pages/retailer/BrowseProducts";
import Search from "./pages/retailer/Search";
import MyOrders from "./pages/retailer/MyOrders";
import TrackOrder from "./pages/retailer/TrackOrder";
import AddToCart from "./pages/retailer/AddToCart";
import { Analytics as AnalyticsPage } from "./pages/retailer/Analytics";
import Profile from "./pages/retailer/Profile";
import Notifications from "./pages/retailer/Notifications";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />}>
            <Route index element={<AllUsers />} />
            <Route path="retailers" element={<Retailers />} />
          </Route>

          <Route path="productspage" element={<AdminProducts />}>
            <Route index element={<ProductModeration />} />
          </Route>
        </Route>
        <Route path="/retailerdashboard" element={<RetailerDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="browse" element={<BrowseProducts />} />
          <Route path="search" element={<Search />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="track" element={<TrackOrder />} />
          <Route path="cart" element={<AddToCart />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
