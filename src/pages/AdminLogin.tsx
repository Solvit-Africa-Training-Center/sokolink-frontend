import React, { useState, useEffect } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useAdminLoginMutation } from "../services/api/sokoLinkApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const AdminLogin: React.FC = () => {
    const dispatch = useDispatch();
    const [
        adminLogin,
        { data: adminData, isLoading, error: adminError, isSuccess },
    ] = useAdminLoginMutation();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // ✅ Redirect + dispatch on successful login
    useEffect(() => {
        if (isSuccess && adminData) {
            // Store token + user in Redux slice
            dispatch(
                setCredentials({ user: adminData.user, token: adminData.token })
            );
            // Redirect to admin dashboard
            navigate("/admin");
        }
    }, [isSuccess, adminData, dispatch, navigate]);

    // Handle API errors
    useEffect(() => {
        if (adminError) {
            const errorMessage =
                "data" in adminError
                    ? (adminError.data as { message?: string })?.message || "Login failed"
                    : "Login failed";

            console.error("Login error:", errorMessage);
        }
    }, [adminError]);

    const togglePasswordVisibility = () =>
        setShowPassword((prev) => !prev);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await adminLogin(formData).unwrap();
            // Success is handled by useEffect
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#eaf4f3] p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-6 flex flex-col items-center justify-center">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="SokoLink Logo"
                            className="h-10 w-auto cursor-pointer"
                        />
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold">Admin Login</h1>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Sign in to access the admin dashboard
                    </p>
                </div>

                {/* API error message */}
                {adminError && (
                    <div className="mb-4 rounded-md bg-red-50 p-3">
                        <p className="text-sm text-red-800">
                            {"data" in adminError
                                ? (adminError.data as { message?: string })?.message ||
                                "Login failed. Please try again."
                                : "Login failed. Please try again."}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-teal-500"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border p-2 pr-10 focus:ring-teal-500 ${errors.password
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-teal-500"
                                }`}
                            placeholder="Enter your password"
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-gray-400"
                        >
                            {showPassword ? (
                                <MdOutlineVisibilityOff className="h-5 w-5" />
                            ) : (
                                <MdOutlineVisibility className="h-5 w-5" />
                            )}
                        </span>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
