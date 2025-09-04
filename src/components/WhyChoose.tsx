import React from "react";

const WhyChoose: React.FC = () => {
  const reasons = [
    {
      title: "Verified Businesses",
      desc: "All sellers undergo thorough verification to ensure quality and reliability.",
    },
    {
      title: "Business Growth",
      desc: "Quick ordering, instant payment processing, and rapid delivery coordination.",
    },
    {
      title: "Fast Transactions",
      desc: "Analytics, insights, and tools to help your business thrive and expand.",
    },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Why Choose SokoLink?</h2>
      <p className="text-gray-600 mb-12">Built for Rwandan commerce, designed for growth.</p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {reasons.map((reason, idx) => (
          <div key={idx}>
            <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
            <p className="text-gray-600 text-sm">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
