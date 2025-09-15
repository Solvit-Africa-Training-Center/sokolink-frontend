import  { useState } from 'react';
import Navbar from '../components/Navbar';
import { useGetProductsQuery } from '../services/api/sokoLinkApi';
import { StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';


// Define the product interface based on your data structure
interface ProductVariation {
  colors: string[];
  memory?: string[];
  storage?: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  productCatId: string;
  productSubCatId: string;
  userId: string;
  variation: ProductVariation;
  images: string[];
  isAvailable: boolean;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Product[];
  message: string;
  success: boolean;
}

function Products() {
    const { data: productsResponse, isLoading, isError, isSuccess } = useGetProductsQuery(undefined, {
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMountOrArgChange: false,
    });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('Kigali');
  const [minOrder, setMinOrder] = useState(1);

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US') + ' RWF';
  };

  // Filter products based on criteria
  const filteredProducts = productsResponse?.data?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesLocation = true; // Assuming all products are from Kigali based on design
    
    return matchesSearch && matchesPrice && matchesLocation;
  });

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="px-[120px] py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Navbar />
        <div className="px-[120px] py-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error loading products</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (!productsResponse?.data || productsResponse.data.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="px-[120px] py-8">
          <h1 className='text-4xl font-bold text-black mb-8'>Browse Products</h1>
          <p className="text-gray-600 mb-8">Discover quality from verified wholesalers and retailers.</p>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="px-[120px] py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className='text-4xl font-bold text-black mb-2'>Browse Products</h1>
          <p className="text-gray-600 text-lg">Discover quality from verified wholesalers and retailers.</p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for products
                </label>
                <input
                  type="text"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  {['Whole category', 'Electronics', 'Clothing', 'Shoes', 'Other'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.toLowerCase()}
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Price range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Location</h3>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Kigali">Kigali</option>
                  <option value="Other">Other locations</option>
                </select>
              </div>

              {/* Minimum Order */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Minimum Order</h3>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Apply Filter Button */}
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Apply filter
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredProducts || productsResponse.data).map((product) => {
                const originalPrice = product.price * 1.5;
                const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.images[0] || '/placeholder-image.jpg'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {!product.isAvailable && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                          Out of Stock
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                          -{discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Content */}
                    <div className="p-4">
                      {/* Rating and Reviews */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm"><StarIcon/></span>
                          ))}
                        </div>
                        <span className="text-gray-600 ml-2 text-sm">
                                    <StarIcon /> 4.8 (124 Reviews)
                        </span>
                      </div>

                      {/* Seller Name */}
                      <p className="text-gray-600 text-sm mb-2">
                        💬 Kigali Wholesaler LTD
                      </p>

                      {/* Product Name */}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-600 font-bold text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {discount > 0 && (
                          <span className="text-gray-400 line-through text-sm">
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <Link to={'/productdetail/'+product.id} className="flex-1 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors text-sm">
                          View details
                        </Link>
                        <button
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                          disabled={!product.isAvailable || product.stock === 0}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show message if no products match filters */}
            {filteredProducts?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products match your filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange({ min: 0, max: 1000000 });
                    setSelectedCategory('all');
                  }}
                  className="text-blue-600 hover:text-blue-800 mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;