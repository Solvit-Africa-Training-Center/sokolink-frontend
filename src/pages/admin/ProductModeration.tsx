import React, { useState, useMemo } from "react";
import {
    FiSearch,
    FiCheckCircle,
    FiXCircle,
    FiMessageSquare,
    FiEye,
} from "react-icons/fi";
import { useGetAdminProductsQuery } from "../../services/api/sokoLinkApi";

interface AdminProduct {
    id: string;
    name: string;
    business: string;
    businessId: string;
    category: string;
    price: string;
    description?: string;
    images?: string[];
}

const ProductModeration: React.FC = () => {
    const { data: products = [], isLoading, isError } = useGetAdminProductsQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
        null
    );

    // Search filtering
    const filteredProducts = useMemo(() => {
        return products.filter((p: any) =>
            [p.name, p.business, p.businessId, p.category]
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    // const handleApprove = (id: string) => {
    //     console.log("Approve", id);
    // };

    // const handleRemove = (id: string) => {
    //     console.log("Remove", id);
    // };

    const handleContactSeller = (id: string) => {
        console.log("Contact seller", id);
    };

    if (isLoading) return <p className="text-gray-500">Loading products...</p>;
    if (isError) return <p className="text-red-500">Failed to load products.</p>;

    return (
        <div className="">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Product Moderation</h1>
                <p className="text-gray-600 mt-2">
                    Review submitted products and manage marketplace quality
                </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-hidden  "
                        placeholder="Search by name, business, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Product List */}
            <div className="space-y-6">
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    filteredProducts.map((product: any) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:justify-between"
                        >
                            <div className="flex-1 flex flex-col md:flex-row">
                                {/* Product Image */}
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-md mr-6"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 mr-6">
                                        No Image
                                    </div>
                                )}

                                {/* Info */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {product.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {product.business} • {product.businessId}
                                    </p>
                                    <p className="mt-2 font-bold text-gray-900">{product.price}</p>
                                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                                <ActionButton
                                    label="View Details"
                                    color="blue"
                                    icon={<FiEye className="mr-2" />}
                                    onClick={() => setSelectedProduct(product)}
                                />
                                {/* <ActionButton
                                    label="Approve"
                                    color="green"
                                    icon={<FiCheckCircle className="mr-2" />}
                                    onClick={() => handleApprove(product.id)}
                                /> */}
                                {/* <ActionButton
                                    label="Remove"
                                    color="red"
                                    icon={<FiXCircle className="mr-2" />}
                                    onClick={() => handleRemove(product.id)}
                                /> */}
                                <ActionButton
                                    label="Contact Seller"
                                    color="gray"
                                    icon={<FiMessageSquare className="mr-2" />}
                                    onClick={() => handleContactSeller(product.id)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* View Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0   bg-black/50 flex items-center justify-center z-50 cursor-pointer">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold text-gray-900">
                            {selectedProduct.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {selectedProduct.business} • {selectedProduct.businessId}
                        </p>
                        <p className="mt-2 font-bold text-gray-900">
                            {selectedProduct.price}
                        </p>
                        {selectedProduct.images && selectedProduct.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {selectedProduct.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${selectedProduct.name} ${idx}`}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                ))}
                            </div>
                        )}
                        <p className="mt-4 text-gray-700">{selectedProduct.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductModeration;

const ActionButton = ({
    label,
    color,
    icon,
    onClick,
}: {
    label: string;
    color: "blue" | "green" | "red" | "gray";
    icon?: React.ReactNode;
    onClick: () => void;
}) => {
    const colors: Record<string, string> = {
        blue: "bg-[#005A60FF] hover:bg-[#008A94FF] focus:ring-[#02545AFF] cursor-pointer",
        green: "bg-[#008994] hover:bg-green-700 focus:ring-green-500 cursor-pointer",
        red: "bg-red-600 hover:bg-red-700 focus:ring-red-500 cursor-pointer",
        gray: "bg-gray-400 hover:bg-gray-600 focus:ring-gray-500 cursor-pointer",
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center ${colors[color]}`}
        >
            {icon}
            {label}
        </button>
    );
};
