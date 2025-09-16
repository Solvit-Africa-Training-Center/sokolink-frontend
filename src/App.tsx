// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Forgotpassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import AdminDashboard from './pages/admin/AdminDashboard';
import Overview from './pages/admin/Overview';
import Reports from './pages/admin/Reports';
import Analytics from './pages/admin/Analytics';
import Users from './pages/admin/Users';
import AllUsers from './pages/admin/AllUsers';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

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
        <Route path='/admin' element={<AdminDashboard />} >
          <Route index element={<Overview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path='users' element={<Users />}>
          <Route index element={<AllUsers />} />
            
          </Route>
         
          </Route>
        
      </Routes>
     
    </Router>
  );
}

export default App;
