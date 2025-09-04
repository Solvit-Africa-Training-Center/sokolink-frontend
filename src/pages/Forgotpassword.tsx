// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import images from "../data/images"; // ✅ using your logo from images array

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // TODO: connect to backend API to send reset link
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F3F3] px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            src={images[0]} // ✅ using your logo
            alt="SokoLink Logo"
            className="h-10 w-auto"
          />
          
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
        <p className="text-gray-600 text-sm mb-6">
          No worries! Enter your email address and we’ll send you a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md px-10 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="mt-6">
          <Link
            to="/Login"
            className="text-sm text-gray-500 hover:text-teal-600 flex items-center justify-center gap-1"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
