// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Forgotpassword'; // ✅ import new page
import About  from './pages/About'; 
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} /> {/* ✅ new route */}
        <Route path='/about' element={<About />} /> {/* ✅ new route */}
        <Route path='/contact' element={<Contact />} /> {/* ✅ new route */}
      </Routes>
    </Router>
  );
};

export default App;
