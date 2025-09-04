import React from "react";
import { Heart, Star, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import images from "../data/images";

const FeaturedProducts: React.FC = () => {
    return (
        <section id="products" className="px-[120px] py-16 bg-[#E1F1F1]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Latest Products</h2>
                    <p className="text-gray-600 text-sm">
                        Discover top-rated products from verified suppliers
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <ArrowLeft size={18} />
                    </button>
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {[2, 3].map((idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-lg shadow-[0_0px_4px_rgba(0,0,0,0.25)] overflow-hidden">
                        <div className="relative">
                            <span className="absolute top-4 left-4 bg-[#FF6F61] text-white text-xs px-2 py-1 rounded-md font-medium">
                                New
                            </span>
                            <button className="absolute top-4 right-4 p-2  rounded-full  ">
                                <Heart size={18} className="text-[#FF6F61]" />
                            </button>
                            <img src={images[idx]} alt="Product" className="w-full cursor-pointer" />
                        </div>
                        <div className="mt-4 px-[40px] py-[40px]">
                            <h3 className="font-semibold">{idx === 2 ? "Samsung Galaxy A54" : "Shoes"}</h3>
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                                <Star className="text-yellow-500" size={16} />
                                <span>4.8 (124 Reviews)</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin size={16} className="mr-1" /> Kigali Wholesaler LTD
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-lg font-bold text-gray-900">120,000RWF</span>
                                <span className="text-sm text-gray-400 line-through">180,000 RWF</span>
                            </div>
                            <div className="mt-4 flex flex-col gap-3">
                                <button className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm hover:border-teal-500 hover:text-teal-500">
                                    View details
                                </button>
                                <button className="flex-1 flex items-center justify-center bg-teal-500 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-600">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;

