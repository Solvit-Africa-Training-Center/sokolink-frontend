import React from "react";
import images from "../data/images";
import Slider from "./Slider";

const HeroSection: React.FC = () => {
  return (
    <section className="grid md:grid-cols-2 items-center px-[120px] bg-[#E1F1F1] py-16 gap-8 mt-0">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Connect. <span className="text-teal-500">Trade.</span>{" "}
          <span className="text-teal-700">Grow Together.</span>
        </h1>
        <p className="mt-4 text-gray-600">
          SokoLink brings wholesalers, retailers, and customers together in one powerful
          marketplace. Discover better prices, build lasting partnerships, and grow your
          business with trusted connections.
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="bg-teal-500 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-600">
            Start Shopping
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:border-teal-500 hover:text-teal-500">
            Browse Products
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        {/* <img src={images[1]} alt="Hero" className="w-full cursor-pointer" /> */}
        <Slider />
      </div>
    </section>
  );
};

export default HeroSection;
