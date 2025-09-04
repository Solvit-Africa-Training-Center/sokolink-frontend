import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import LatestProducts from "../components/LatestProducts";
import JoinAsSection from "../components/JoinAsSection";
import WhyChoose from "../components/WhyChoose";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <LatestProducts />
      <JoinAsSection />
      <WhyChoose />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
