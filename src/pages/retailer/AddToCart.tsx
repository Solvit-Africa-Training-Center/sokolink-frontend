// src/pages/retailer/AddToCart.tsx
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, ShoppingBag } from "lucide-react";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

const AddToCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const loadCartFromStorage = () => {
            try {
                const savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    // Only set cart if it's a non-empty array
                    if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                        setCart(parsedCart);
                    }
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCartFromStorage();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart"); // Remove if empty
        }
    }, [cart]);

    // Update quantity for a specific item
    const updateQuantity = (productId: string, delta: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId
                    ? {
                        ...item,
                        quantity: Math.min(
                            Math.max(item.quantity + delta, 1), // min = 1
                            item.stock // max = stock
                        ),
                    }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeItem = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };

    // Calculate totals in RWF
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = cart.length > 0 ? 500 : 0; // RWF 500 shipping
    const total = subtotal + shippingCost;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Loading cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Shopping Cart</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Your cart is empty. Start shopping to add items!
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <ArrowLeft size={20} />
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">
                        Manage items in your cart before checkout. You can update quantities or remove items.
                    </p>
                   
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2  bg-white p-6 shadow rounded">
                        <div className="flex gap-4 items-center mb-8">
                            <ShoppingBag size={18}  />
                            <span className="text-gray-700 font-medium">
                                Cart Items ({cart.length})
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className="bg-white rounded-lg outline outline-[#008994]/10 shadow p-6"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-center h-fit">
                                        {/* Product Image */}
                                        <img
                                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
                                            alt={item.name}
                                            className="w-auto h-20 object-cover rounded-lg"
                                        />

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                <span>Wire: 24</span>
                                                <span>Stock: {item.stock}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm">Newport Coffee Co.</p>
                                        </div>

                                        {/* Price and Quantity Controls */}
                                        <div className="flex flex-col items-end gap-4">
                                            {/* Item Total Price */}
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">
                                                    Rwf {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Rwf {item.price.toLocaleString()} each
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, -1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-12 text-center font-medium text-lg">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                       </div>

                       
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1 flex flex-col gap-4 ">
                        <div className="bg-white rounded-lg shadow  p-6  ">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rwf {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Rwf {shippingCost.toLocaleString()}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-semibold text-gray-900">
                                    <span>Total</span>
                                    <span>Rwf {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mb-4 cursor-pointer">
                                Proceed to Checkout →
                            </button>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                        {/* Single Wholesaler Policy */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Single Wholesaler Policy</h4>
                            <p className="text-blue-800 text-sm">
                                All items in your cart are from the same wholesaler. This ensures efficient delivery and consistent quality.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;