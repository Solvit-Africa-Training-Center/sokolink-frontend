import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="bg-teal-700 text-white py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Transform Your Business?
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        Join thousands of businesses already growing with SokoLink. Start your journey today.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
          Get started now
        </button>
        <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-700">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default CTASection;
