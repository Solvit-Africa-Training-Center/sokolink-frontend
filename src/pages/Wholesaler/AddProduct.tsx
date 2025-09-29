import React, { useState } from "react";
import Sidebar from "../../pages/Wholesaler/Sidebar";
import { useCreateProductMutation } from "../../services/api/sokoLinkApi"; // Import your mutation

const AddProduct: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    expiredAt: "",
    variation: {
      size: "",
      color: "",
      weight: ""
    }
  });

  const [images, setImages] = useState<File[]>([]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle variation fields separately
    if (name.startsWith('variation.')) {
      const variationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        variation: {
          ...prev.variation,
          [variationField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
      description: "",
      price: "",
      stock: "",
      category: "",
      expiredAt: "",
      variation: {
        size: "",
        color: "",
        weight: ""
      }
    });
    setImages([]);
  };

  // Save product
  const handleSave = async () => {
    // Validate required fields
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert("Please fill in all required fields: Name, Price, Stock, and Category");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      // Prepare the data for API
      const productData = {
        name: formData.name,
        description: formData.description || "",
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        variation: formData.variation.size || formData.variation.color || formData.variation.weight
          ? formData.variation
          : undefined,
        expiredAt: formData.expiredAt || undefined,
        images: images
      };

      console.log("Submitting product:", productData);

      // Call the mutation
      const result = await createProduct(productData).unwrap();

      alert("Product created successfully! ✅");
      console.log("Product created:", result);

      // Reset form after successful submission
      handleCancel();

    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
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
                    placeholder="Enter product name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    required
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    required
                  >
                    <option value="">Select category *</option>
                    <option value="Beans">Beans</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Grains">Grains</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="electronics">Electronics</option>
                  </select>
                  <textarea
                    name="description"
                    placeholder="Describe your product in detail"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full md:col-span-2"
                    rows={3}
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Pricing & Inventory *</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (Rwf) *"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    required
                    min="0"
                    step="0.01"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity *"
                    value={formData.stock}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    required
                    min="0"
                  />
                  <input
                    type="date"
                    name="expiredAt"
                    value={formData.expiredAt}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>

              {/* Product Variation */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Product Variations (Optional)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="variation.size"
                    placeholder="Size (e.g., 1kg, 500g)"
                    value={formData.variation.size}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="text"
                    name="variation.color"
                    placeholder="Color"
                    value={formData.variation.color}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <input
                    type="text"
                    name="variation.weight"
                    placeholder="Weight"
                    value={formData.variation.weight}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right side (image upload + buttons) */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg mb-4">Product Images *</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="fileUpload"
                    required
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer text-gray-500">
                    Drag and drop images here, or click to browse
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Maximum 5 images, up to 10MB each</p>
                </div>
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">{images.length} image(s) selected:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Save Product"}
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