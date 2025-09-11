import React, { useState } from "react";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullNames: "",
    emailAddress: "",
    phoneNumber: "",
    enquiryType: "",
    subject: "",
    message: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    fullNames: "",
    emailAddress: "",
    phoneNumber: "",
    enquiryType: "",
    subject: "",
    message: "",
    terms: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullNames: "",
      emailAddress: "",
      phoneNumber: "",
      enquiryType: "",
      subject: "",
      message: "",
      terms: "",
    };

    if (!formData.fullNames.trim()) {
      newErrors.fullNames = "Full Names is required.";
      isValid = false;
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Email Address is invalid.";
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
      isValid = false;
    }
    if (!formData.enquiryType) {
      newErrors.enquiryType = "Enquiry Type is required.";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }
    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
      alert("Message sent successfully!");
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="text-center py-16 px-4 bg-[#eaf4f3]">
        <h1 className="text-4xl font-bold text-teal-600 md:text-5xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Have questions about SokoLink? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto -mt-16 flex flex-col items-start px-4 lg:flex-row lg:space-x-8 flex-grow">
        {/* Contact Info (Left Column) */}
        <div className="w-full lg:w-1/3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>
            <p className="mt-2 text-gray-600">
              We're here to help and answer any questions you might have. We
              look forward to hearing from you.
            </p>

            {/* Head Office Card */}
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <IoLocationOutline className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Head Office</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Plot 54, Rwandex Road
                <br />
                Kigali, Rwanda
                <br />
                P.O. Box 12345
              </p>
            </div>

            {/* Phone Card */}
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <IoCallOutline className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                +250780900083
                <br />
                +250780900083
              </p>
              <p className="mt-1 text-sm font-semibold text-teal-600">
                Mon - Fri : 9AM - 6 PM
              </p>
            </div>

            {/* Email Card */}
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <IoMailOutline className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                support@sokolink.com
                <br />
                business@sokolink.com
                <br />
                24/7 Support
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right Column) */}
        <div className="mt-8 w-full rounded-lg bg-white p-6 shadow-md lg:mt-0 lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {/* Full Names */}
            <div>
              <label
                htmlFor="fullNames"
                className="block text-sm font-medium text-gray-700"
              >
                Full Names
              </label>
              <input
                type="text"
                name="fullNames"
                id="fullNames"
                value={formData.fullNames}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.fullNames ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full names"
              />
              {errors.fullNames && (
                <p className="mt-1 text-xs text-red-500">{errors.fullNames}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.emailAddress ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.emailAddress && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.emailAddress}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+250780900083"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Enquiry Type */}
            <div>
              <label
                htmlFor="enquiryType"
                className="block text-sm font-medium text-gray-700"
              >
                Enquiry Type
              </label>
              <select
                name="enquiryType"
                id="enquiryType"
                value={formData.enquiryType}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.enquiryType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select enquiry type
                </option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership Inquiry">Partnership Inquiry</option>
              </select>
              {errors.enquiryType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.enquiryType}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Brief description of your enquiry"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Please provide details about your enquiry"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-700"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
