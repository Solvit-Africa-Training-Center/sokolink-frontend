import React from "react";
import images from "../data/images";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6 md:px-[120px]">
        {/* Footer links row  */}
      <div className="w-full mx-auto grid md:grid-cols-4  items-top gap-8 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            {/* <span className="bg-teal-600 text-white rounded-full p-2">S</span>
            <h3 className="font-bold text-lg">SokoLink</h3> */}
            <img src={images[0]} alt="SokoLink Logo" className="h-10 w-auto" />
          </div>
          <p className="text-gray-600 text-sm">
            Connecting wholesalers, retailers, and customers across Africa. Building the future of commerce, one connection at a time.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">For Customers</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="" className="hover:text-teal-500">Browse Products</a></li>
            <li><a href="" className="hover:text-teal-500">Join as Customer</a></li>
            <li><a href="" className="hover:text-teal-500">Shopping Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">For Businesses</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="" className="hover:text-teal-500">Join as Retailer</a></li>
            <li><a href="" className="hover:text-teal-500">Join as Wholesaler</a></li>
            <li><a href="" className="hover:text-teal-500">Business Resources</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="" className="hover:text-teal-500">Help Center</a></li>
            <li><a href="" className="hover:text-teal-500">Contact Us</a></li>
            <li><a href="" className="hover:text-teal-500">About SokoLink</a></li>
          </ul>
        </div>
      </div>
      {/* Devider */}
      <div className="h-[1px] bg-[#e2e2e2] my-6 w-full"></div>
      <div className="pt-6  text-sm text-gray-500 border-[#e2e2e2] flex flex-col md:flex-row justify-between">
        <p>© 2025 SokoLink All rights reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="" className="hover:text-teal-500">Privacy Policy</a>
          <a href="" className="hover:text-teal-500">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
