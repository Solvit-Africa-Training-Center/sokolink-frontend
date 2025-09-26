import React, { useState } from "react";
import Sidebar from "../../pages/Wholesaler/Sidebar";

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    minOrderQty: "",
    stockQty: "",
    originSource: "",
    originCountry: "",
  });

  const [images, setImages] = useState<File[]>([]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  // Cancel -> reset form
  const handleCancel = () => {
    setFormData({
      name: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      minOrderQty: "",
      stockQty: "",
      originSource: "",
      originCountry: "",
    });
    setImages([]);
  };

  // Save -> later connect to API
  const handleSave = () => {
    console.log("Product Data:", formData);
    console.log("Images:", images);
    alert("Product saved (check console) ✅");
  };

  return (
    <div className="flex min-h-screen bg-[#eaf6f4]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-600 mb-6">Track and manage your order history</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side (forms) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="text"
                    name="brand"
                    placeholder="Enter brand name"
                    value={formData.brand}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select category</option>
                    <option value="Beans">Beans</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                  </select>
                  <textarea
                    name="description"
                    placeholder="Describe your product in detail"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full md:col-span-2"
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Pricing & Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (Rwf)"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="number"
                    name="minOrderQty"
                    placeholder="Minimum Order Quantity"
                    value={formData.minOrderQty}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="number"
                    name="stockQty"
                    placeholder="Stock Quantity"
                    value={formData.stockQty}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="originSource"
                    placeholder="Origin Source"
                    value={formData.originSource}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="text"
                    name="originCountry"
                    placeholder="Origin Country"
                    value={formData.originCountry}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select category</option>
                    <option value="Beans">Beans</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                  </select>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Enter brand name"
                    value={formData.brand}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <textarea
                    name="description"
                    placeholder="Describe your product in detail"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full md:col-span-2"
                  />
                </div>
              </div>
            </div>

            {/* Right side (image upload + buttons) */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg mb-4">Product Images</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="fileUpload" />
                  <label htmlFor="fileUpload" className="cursor-pointer text-gray-500">
                    Drag and drop images here, or click to browse
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Maximum 5 images, up to 10MB each</p>
                </div>
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
