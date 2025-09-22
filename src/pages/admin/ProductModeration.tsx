import React, { useState } from 'react';
import { FiSearch, FiFlag, FiClock, FiCheckCircle, FiXCircle, FiMessageSquare } from 'react-icons/fi';

interface Product {
    id: number;
    name: string;
    business: string;
    businessId: string;
    category: string;
    price: string;
    flagReason: string;
    reportedBy: string;
    reportDate: string;
    description: string;
}

const ProductModeration: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data
    const stats = {
        flaggedProducts: 156,
        pendingReview: 42,
        approvedToday: 142,
        removedToday: 8
    };

    const products: Product[] = [
        {
            id: 1,
            name: "iPhone 15 Pro Max 256GB",
            business: "TechWorld Electronics",
            businessId: "BWS-001",
            category: "Electronics",
            price: "Rwf 160,000",
            flagReason: "Suspicious pricing - Below market rate",
            reportedBy: "System Algorithm",
            reportDate: "2024-02-27",
            description: "Brand new iPhone 15 Pro Max with 256GB storage."
        },
        {
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            business: "MobileHub Kenya",
            businessId: "RTL-045",
            category: "Electronics",
            price: "Rwf 98,000",
            flagReason: "Copyright concern - Unauthorized brand use",
            reportedBy: "Customer Reports",
            reportDate: "2024-03-23",
            description: "Latest Samsung Galaxy S24 Ultra smartphone."
        },
        {
            id: 3,
            name: "Dell XPS 13 Laptop",
            business: "ComputerStore Ltd",
            businessId: "BWS-001",
            category: "Electronics",
            price: "Rwf 70,000",
            flagReason: "Quality concerns - Inconsistent negative reviews",
            reportedBy: "Customer Reports",
            reportDate: "2024-03-29",
            description: "High performance Dell XPS 13 laptop for professionals."
        }
    ];

    const handleReview = (id: number) => {
        console.log(`Review product ${id}`);
        // Implement review logic
    };

    const handleApprove = (id: number) => {
        console.log(`Approve product ${id}`);
        // Implement approval logic
    };

    const handleRemove = (id: number) => {
        console.log(`Remove product ${id}`);
        // Implement removal logic
    };

    const handleContactSeller = (id: number) => {
        console.log(`Contact seller for product ${id}`);
        // Implement contact logic
    };

    return (
        <div className="">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Product Moderation</h1>
                    <p className="text-gray-600 mt-2">Review flagged products and manage marketplace quality</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search by business name, email, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100">
                                <FiFlag className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Flagged Products</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.flaggedProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100">
                                <FiClock className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pendingReview}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100">
                                <FiCheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.approvedToday}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-gray-100">
                                <FiXCircle className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Removed Today</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.removedToday}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div className="space-y-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Business: {product.business} • {product.businessId}
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                Category: {product.category}
                                            </span>
                                        </div>

                                        <p className="mt-3 text-lg font-bold text-gray-900">{product.price}</p>

                                        <div className="mt-3 p-3 bg-red-50 rounded-md">
                                            <p className="text-sm font-medium text-red-800">
                                                Flagged: {product.flagReason}
                                            </p>
                                            <p className="text-xs text-red-600 mt-1">
                                                Reported by {product.reportedBy} on {product.reportDate}
                                            </p>
                                        </div>

                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600">Product Description:</p>
                                            <p className="text-gray-800">{product.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                                        <button
                                            onClick={() => handleReview(product.id)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Review
                                        </button>
                                        <button
                                            onClick={() => handleApprove(product.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Remove Product
                                        </button>
                                        <button
                                            onClick={() => handleContactSeller(product.id)}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                                        >
                                            <FiMessageSquare className="mr-2" />
                                            Contact Seller
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductModeration;