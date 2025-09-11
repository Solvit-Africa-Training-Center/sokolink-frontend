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
import Wishlist from './pages/Wishlist';

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
        <Route path="/help" element={<Help />} /> {/* ✅ Help at /help */}
        <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ Wishlist at /wishlist */}
      </Routes>
    </Router>
  );
};

export default App;
