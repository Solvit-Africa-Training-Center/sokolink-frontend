import React from "react";
import { Link } from "react-router-dom";

const JoinAsSection: React.FC = () => {
  const roles = [
    {
      title: "Customer",
      desc: "Browse and shop products from trusted businesses.",
      button: "Join as Customer",
    },
    {
      title: "Retailer",
      desc: "Expand your store, reach more customers, and grow.",
      button: "Join as Retailer",
    },
    {
      title: "Wholesaler",
      desc: "Sell in bulk, streamline orders, and connect with retailers.",
      button: "Join as Wholesaler",
    },
  ];

  return (
    <section className="bg-gray-100 px-[120px] py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Join As</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {roles.map((role, idx) => (
          <div key={idx} className="shadow rounded-xl p-6 text-center hover:shadow-lg bg-white">
            <h3 className="font-semibold text-xl mb-2">{role.title}</h3>
            <p  className="text-gray-600 mb-4">{role.desc}</p>
            <Link to="/signup" >
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                {role.button}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinAsSection;
