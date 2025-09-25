// src/pages/retailer/BrowseProducts.tsx
import { useGetProductsQuery } from "../../services/api/sokoLinkApi";
import { useEffect, useState } from "react";
import { Heart, X, Star, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

interface WishlistItem {
    productId: string;
    name: string;
    price: number;
    image: string;
}

interface Product {
    productId: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
    productCatId?: string;
    rating?: number;
    discount?: number;
    wholesaler?: string;
    location?: string;
    minOrder?: number;
}

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

const BrowseProducts = () => {
    const { data, isLoading, isError } = useGetProductsQuery();
    const navigate = useNavigate();

    // ✅ Initialize state directly from localStorage
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        try {
            const savedWishlist = localStorage.getItem("wishlist");
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        } catch {
            return [];
        }
    });

    // Toast notifications state
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // filter state
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterAvailability, setFilterAvailability] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [minOrder, setMinOrder] = useState(0);

    // ✅ Save to localStorage whenever cart/wishlist changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Toast functions - FIXED: Prevents duplicate toasts
    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now();

        // Remove any existing toasts with the same message to prevent duplicates
        setToasts(prev => {
            const filtered = prev.filter(toast => toast.message !== message);
            return [...filtered, { id, message, type }];
        });

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Add to Cart
    const addToCart = (product: Product) => {
        if (!product?.productId) return;

        setCart((prev) => {
            const existing = prev.find((item) => item.productId === product.productId);

            if (existing) {
                showToast(`${product.name} quantity updated in cart`, 'success');
                return prev.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                        : item
                );
            }

            showToast(`${product.name} added to cart`, 'success');
            return [
                ...prev,
                {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || "",
                    quantity: 1,
                    stock: product.stock,
                },
            ];
        });
    };

    // Toggle Wishlist
    const toggleWishlist = (product: Product) => {
        if (!product?.productId) return;

        setWishlist((prev) => {
            const exists = prev.find((item) => item.productId === product.productId);

            if (exists) {
                showToast(`${product.name} removed from wishlist`, 'info');
                return prev.filter((item) => item.productId !== product.productId);
            }

            showToast(`${product.name} added to wishlist`, 'success');
            return [
                ...prev,
                {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || "",
                },
            ];
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item.productId === productId);
    };

    // Mock data for demonstration
    const getProductDetails = (product: Product) => {
        const categories = {
            'clothes': { wholesaler: 'Rigail Wholesaler LTD', location: 'Kigali', minOrder: 10 },
            'shoes': { wholesaler: 'Rigail Wholesaler LTD', location: 'Kigali', minOrder: 5 },
            'electronics': { wholesaler: 'Tech Distributors Ltd', location: 'Nairobi', minOrder: 2 },
            'phones': { wholesaler: 'Mobile Hub Ltd', location: 'Kampala', minOrder: 1 }
        };

        const category = product.productCatId || 'clothes';
        const details = categories[category as keyof typeof categories] || categories.clothes;

        return {
            rating: 4.8,
            discount: Math.random() > 0.5 ? 2 : 0,
            ...details
        };
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-lg">Loading products...</p>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-lg text-red-600">Failed to load products</p>
        </div>
    );

    // Normalize API response
    let filteredProducts: Product[] = Array.isArray(data?.data)
        ? data.data.map((p: any) => ({
            productId: p.productId || p.id,
            name: p.name,
            price: p.price,
            images: p.images || [],
            stock: p.stock,
            productCatId: p.productCatId,
        }))
        : [];

    // Filters
    if (search.trim()) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (filterCategory !== "all") {
        filteredProducts = filteredProducts.filter((p) => p.productCatId === filterCategory);
    }
    if (filterAvailability === "inStock") {
        filteredProducts = filteredProducts.filter((p) => p.stock > 0);
    } else if (filterAvailability === "outOfStock") {
        filteredProducts = filteredProducts.filter((p) => p.stock === 0);
    }
    filteredProducts = filteredProducts.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center justify-between p-4 rounded-lg shadow-lg min-w-80 max-w-md border-l-4 ${toast.type === 'success'
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : toast.type === 'error'
                                ? 'bg-red-50 border-red-500 text-red-700'
                                : 'bg-blue-50 border-blue-500 text-blue-700'
                            }`}
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 hover:opacity-70"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="">
                    <h1 className="text-4xl font-bold text-gray-900 mb-1">Browse Products</h1>
                    <p className="text-sm text-gray-600">Discover quality from verified wholesalers and retailers</p>
                </div>
            </div>

            <div className="">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filters Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-3 bg-teal-600 text-white rounded-lg px-6 py-3 shadow-lg hover:bg-teal-700 transition-colors"
                    >
                        <Filter size={18} />
                        <span className="font-semibold">Show Filters</span>
                    </button>

                    {/* Sidebar Filters */}
                    <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit `}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                <Filter size={20} />
                                Filters
                            </h2>
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setFilterCategory("all");
                                    setFilterAvailability("all");
                                    setMinPrice(0);
                                    setMaxPrice(100000);
                                    setMinOrder(0);
                                }}
                                className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Search Products</label>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500  focus:outline-hidden transition-colors"
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                            <div className="space-y-3">
                                {['all', 'clothes', 'shoes', 'electronics', 'phones'].map((category) => (
                                    <label key={category} className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category}
                                                checked={filterCategory === category}
                                                onChange={(e) => setFilterCategory(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className={`w-3 h-3 border-1 rounded-full flex items-center justify-center transition-colors ${filterCategory === category
                                                    ? 'border-teal-500 bg-teal-500'
                                                    : 'border-gray-300 group-hover:border-teal-400'
                                                }`}>
                                                {filterCategory === category && (
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-700 font-medium  text-sm capitalize group-hover:text-teal-600 transition-colors">
                                            {category === 'all' ? 'All Categories' : category}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range (RWF)</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                            placeholder="100000"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-3">
                                    <div className="text-sm text-gray-600">
                                        Selected range: RWF {minPrice.toLocaleString()} - RWF {maxPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full text-sm bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl">
                            Apply Filters
                        </button>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                            {filteredProducts.length === 0 ? (
                                <div className="col-span-3 text-center py-16">
                                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                    <p className="text-xl text-gray-600 mb-2">No products found</p>
                                    <p className="text-gray-500">Try adjusting your filters or search terms</p>
                                </div>
                            ) : (
                                filteredProducts.map((product) => {
                                    const details = getProductDetails(product);
                                    return (
                                        <div
                                            key={product.productId}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                        >
                                            {/* Product Image */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
                                                    alt={product.name}
                                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* Badges */}
                                                <div className="flex gap-2">
                                                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-bold shadow-lg">
                                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                        {details.rating}
                                                    </div>
                                                    
                                                </div>
                                                {/* Wishlist Button */}
                                                <button
                                                    onClick={() => toggleWishlist(product)}
                                                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <Heart
                                                        size={20}
                                                        className={
                                                            isInWishlist(product.productId)
                                                                ? "text-red-500 fill-red-500"
                                                                : "text-gray-600 hover:text-red-500"
                                                        }
                                                    />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                                    {product.name}
                                                </h3>

                                                {/* Wholesaler Info */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-semibold text-teal-600">{details.wholesaler}</span>
                                                    <div className="flex items-center gap-1 text-gray-500">
                                                        <MapPin size={14} />
                                                        <span className="text-sm">{details.location}</span>
                                                    </div>
                                                </div>

                                                {/* Price and Stock */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        RWF {product.price.toLocaleString()}
                                                    </span>
                                                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${product.stock > 10
                                                            ? 'bg-green-100 text-green-700'
                                                            : product.stock > 0
                                                                ? 'bg-orange-100 text-orange-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                    </span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        onClick={() => navigate(`/products/${product.productId}`)}
                                                        className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => addToCart(product)}
                                                        disabled={product.stock === 0}
                                                        className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseProducts;