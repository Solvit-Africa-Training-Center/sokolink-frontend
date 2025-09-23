import React, { useState } from "react";
import Logo from "../assets/logo.png";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineStore,
} from "react-icons/md";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  useRegisterWholesalerMutation,
  useRegisterRetailerMutation,
} from "../services/api/sokoLinkApi";

const userTypes = [
  { type: "Customer", icon: <IoPersonOutline className="h-6 w-6" />, description: "Shop from verified retailers and wholesalers" },
  { type: "Retailer", icon: <IoCartOutline className="h-6 w-6" />, description: "Buy from wholesalers, sell to customers" },
  { type: "Wholesaler", icon: <MdOutlineStore className="h-6 w-6" />, description: "Sell products in bulk to retailers" },
];

const Signup: React.FC = () => {
  const [activeUserType, setActiveUserType] = useState("Customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullNames: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    taxNumber: "",
    businessAddress: "",
    businessLicenseNumber: "",
    terms: false,
  });

  const [fileData, setFileData] = useState<{ businessLicenseDocument: File | null; taxCertificate: File | null }>({
    businessLicenseDocument: null,
    taxCertificate: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [registerWholesaler, { isLoading: isWholesalerLoading }] = useRegisterWholesalerMutation();
  const [registerRetailer, { isLoading: isRetailerLoading }] = useRegisterRetailerMutation();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const isBusinessUser = activeUserType === "Retailer" || activeUserType === "Wholesaler";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) setFileData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.fullNames.trim()) { newErrors.fullNames = "Full Names is required."; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = "Email Address is required."; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Email Address is invalid."; isValid = false; }
    if (!formData.phoneNumber.trim()) { newErrors.phoneNumber = "Phone Number is required."; isValid = false; }
    if (!formData.password.trim()) { newErrors.password = "Password is required."; isValid = false; }
    if (!formData.confirmPassword.trim()) { newErrors.confirmPassword = "Confirm Password is required."; isValid = false; }
    else if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = "Passwords do not match."; isValid = false; }

    if (isBusinessUser) {
      if (!formData.businessName.trim()) { newErrors.businessName = "Business Name is required."; isValid = false; }
      if (activeUserType === "Wholesaler") {
        if (!formData.taxNumber.trim()) { newErrors.taxNumber = "Tax Number is required."; isValid = false; }
        if (!formData.businessAddress.trim()) { newErrors.businessAddress = "Business Address is required."; isValid = false; }
        if (!formData.businessLicenseNumber.trim()) { newErrors.businessLicenseNumber = "License Number is required."; isValid = false; }
        if (!fileData.businessLicenseDocument) { newErrors.businessLicenseDocument = "Upload business license."; isValid = false; }
        if (!fileData.taxCertificate) { newErrors.taxCertificate = "Upload tax certificate."; isValid = false; }
      }
    }

    if (!formData.terms) { newErrors.terms = "You must agree to the terms."; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (activeUserType === "Wholesaler") {
        const payload = {
          name: formData.fullNames,
          email: formData.email,
          password: formData.password,
          roleName: "Wholesaler" as const,
          phoneNumber: formData.phoneNumber,
          businessName: formData.businessName,
          taxNumber: formData.taxNumber,
          businessAddress: formData.businessAddress,
          businessLicenseNumber: formData.businessLicenseNumber,
          businessLicenseDocument: fileData.businessLicenseDocument!,
          taxCertificate: fileData.taxCertificate!,
        };
        const response = await registerWholesaler(payload).unwrap();
        alert(`✅ Registered successfully: ${response.message}`);
      } else if (activeUserType === "Retailer") {
        const payload = {
          name: formData.fullNames,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          businessName: formData.businessName,
          roleName: "Retailer", // REQUIRED
        };
        const response = await registerRetailer(payload).unwrap();
        alert(`✅ Registered successfully: ${response.message}`);
      } else {
        alert("Customer registration is not wired up yet!");
      }
    } catch (err) {
      console.error(activeUserType + " registration failed:", err);
      alert(`❌ ${activeUserType} registration failed.`);
    }
  };

  const isLoading = isWholesalerLoading || isRetailerLoading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eaf4f3] p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <Link to="/"><img src={Logo} alt="SokoLink Logo" className="h-10 w-auto cursor-pointer" /></Link>
          <h1 className="mt-4 text-3xl font-bold">Join SokoLink</h1>
          <p className="mt-1 text-center text-sm text-gray-500">Create your account and start connecting</p>
        </div>

        {/* User Types */}
        <div className="mb-6">
          <p className="mb-2 text-base font-semibold">I want to join as :</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {userTypes.map((user) => (
              <div key={user.type} onClick={() => { setActiveUserType(user.type); setErrors({}); }}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors duration-200 ${activeUserType === user.type ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}>
                <div className="flex items-center space-x-2">{user.icon}<p className="font-semibold">{user.type}</p></div>
                <p className="mt-1 text-sm text-gray-600">{user.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Names */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Names</label>
            <input type="text" name="fullNames" value={formData.fullNames} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.fullNames ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your full names" />
            {errors.fullNames && <p className="text-xs text-red-500">{errors.fullNames}</p>}
          </div>

          {/* Email + Phone */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.email ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your email" />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your phone number" />
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Password + Confirm */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`} placeholder="Create a password" />
              <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-gray-400">{showPassword ? <MdOutlineVisibilityOff className="h-5 w-5" /> : <MdOutlineVisibility className="h-5 w-5" />}</span>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm your password</label>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 pr-10 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`} placeholder="Confirm your password" />
              <span onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-gray-400">{showConfirmPassword ? <MdOutlineVisibilityOff className="h-5 w-5" /> : <MdOutlineVisibility className="h-5 w-5" />}</span>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Business Fields */}
          {isBusinessUser && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.businessName ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your business name" />
              {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}

              {/* Only Wholesaler extra fields */}
              {activeUserType === "Wholesaler" && (
                <>
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tax Number</label>
                      <input type="text" name="taxNumber" value={formData.taxNumber} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.taxNumber ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your tax number" />
                      {errors.taxNumber && <p className="text-xs text-red-500">{errors.taxNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Address</label>
                      <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.businessAddress ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your business address" />
                      {errors.businessAddress && <p className="text-xs text-red-500">{errors.businessAddress}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Business License Number</label>
                    <input type="text" name="businessLicenseNumber" value={formData.businessLicenseNumber} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border p-2 ${errors.businessLicenseNumber ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your license number" />
                    {errors.businessLicenseNumber && <p className="text-xs text-red-500">{errors.businessLicenseNumber}</p>}
                  </div>

                  {/* File Inputs */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Business License Document</label>
                    <input type="file" name="businessLicenseDocument" accept="image/*,.pdf" onChange={handleFileChange} className="mt-1 block w-full" />
                    {errors.businessLicenseDocument && <p className="text-xs text-red-500">{errors.businessLicenseDocument}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tax Certificate</label>
                    <input type="file" name="taxCertificate" accept="image/*,.pdf" onChange={handleFileChange} className="mt-1 block w-full" />
                    {errors.taxCertificate && <p className="text-xs text-red-500">{errors.taxCertificate}</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Terms */}
          <div className="mb-6 flex flex-col items-start">
            <div className="flex items-center">
              <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading} className="w-full rounded-md bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-700 disabled:opacity-50">
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="font-semibold text-teal-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
