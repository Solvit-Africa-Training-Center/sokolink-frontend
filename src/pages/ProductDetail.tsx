import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import { useGetProductByIdQuery } from '../services/api/sokoLinkApi';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import type { Product as product } from '../types';

function ProductDetail() {
  const { id } = useParams();
  const { data: productResponse, error, isLoading } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="px-[120px] py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !productResponse?.data) {
    return (
      <div>
        <Navbar />
        <div className="px-[120px] py-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error loading product</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const product = productResponse.data;

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US') + ' RWF';
  };

  const increaseQuantity = () => setQuantity(prev => Math.min(50, prev + 1));
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Get variation options safely
  const formatOptions = product.variation?.format || [];
  const languageOptions = product.variation?.language || [];
  const colorOptions = product.variation?.colors || [];
  const storageOptions = product.variation?.storage || [];

  return (
    <div className='bg-[#E1F1F1] min-h-screen'>
      <Navbar />
      <div className='px-[120px] py-8'>
        <Link to="/products" className='mb-4 flex gap-2 items-center text-[#008994] hover:text-[#005F6E]'><ArrowLeft/> <span>Products</span></Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <img
              src={product.images[0] || '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <span className="text-gray-600">(124 Reviews)</span>
            </div>

            {/* Seller Info */}
            <div className="mb-6">
              <p className="font-semibold text-gray-900">Kigali Wholesaler LTD</p>
              <p className="text-gray-600 text-sm">Verified Seller</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-bold text-[#008994]">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-400 line-through text-lg ml-2">
                {formatPrice(product.price * 1.5)}
              </span>
            </div>

            {/* Format Selection (for books) */}
            {formatOptions.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="flex gap-2 flex-wrap">
                  {formatOptions.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-4 py-2 border rounded-md text-sm ${selectedFormat === format
                        ? 'border-blue-500 bg-blue-50 text-[#008994]'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Language Selection (for books) */}
            {languageOptions.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <div className="flex gap-2 flex-wrap">
                  {languageOptions.map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`px-4 py-2 border rounded-md text-sm ${selectedLanguage === language
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection (for other products) */}
            {colorOptions.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFormat(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedFormat === color ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      style={{
                        backgroundColor: color.toLowerCase().includes('black') ? '#000' :
                          color.toLowerCase().includes('white') ? '#fff' :
                            color.toLowerCase().includes('red') ? '#ef4444' :
                              color.toLowerCase().includes('blue') ? '#3b82f6' :
                                color.toLowerCase().includes('green') ? '#10b981' : '#6b7280'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection (for electronics) */}
            {storageOptions.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <div className="flex gap-2 flex-wrap">
                  {storageOptions.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedFormat(storage)}
                      className={`px-4 py-2 border rounded-md text-sm ${selectedFormat === storage
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity >= 50}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Min order: 1</span>
                <span>Max order: 50</span>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Delivery Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-600">
                  <span className="mr-2">✓</span>
                  <span>Free delivery for orders above RWF 100,000</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  <span>Standard delivery: 2-3 business days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  <span>Express delivery available</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full bg-[#008994] text-white py-3 px-6 rounded-lg hover:bg-[#007B85] transition-colors font-semibold mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!product.isAvailable || product.stock === 0}
            >
              {!product.isAvailable ? 'Out of Stock' : 'Add to cart'}
            </button>

            {/* Stock Info */}
            <p className={`text-sm ${product.stock > 0 ? 'text-[#008994]' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
            </p>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Product ID:</span>
                <span className="font-medium">{product.productId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category ID:</span>
                <span className="font-medium">{product.productCatId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subcategory ID:</span>
                <span className="font-medium">{product.productSubCatId}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className="font-medium">{product.isAvailable ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated:</span>
                <span className="font-medium">{new Date(product.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-12 bg-white p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Reviews Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>

          <div className="space-y-6">
            {[1, 2, 3, 4].map((review) => (
              <div key={review} className="bg-white p-6 rounded-lg shadow-sm ">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">JANE DOE</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Excellent quality product! The content is comprehensive and well-organized.
                  Fast delivery and great packaging. Highly recommend this seller.
                </p>

                <p className="text-sm text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail