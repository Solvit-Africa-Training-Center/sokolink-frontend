import React from "react";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type AccordionItemProps = {
  question: string;
  answer: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border rounded-lg px-4 py-3 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <span className="text-gray-500">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const HelpPage: React.FC = () => {
  const faqs: AccordionItemProps[] = [
    { question: "How to create an account on SokoLink ?", answer: "Step by step guide to create an account on SokoLink." },
    { question: "What are the different user roles ?", answer: "Explanation of customer, retailer, wholesaler, and admin roles." },
    { question: "How do I place an order ?", answer: "Instructions on how to browse products and place orders." },
    { question: "Can I order from multiple sellers at once ?", answer: "Yes, you can order from multiple sellers in one checkout." },
    { question: "How do I become a verified seller ?", answer: "Submit required documents for verification." },
    { question: "What are the selling fees ?", answer: "Details about commissions and fees." },
    { question: "How do I manage my inventory ?", answer: "Guide to adding, editing, and removing products." },
    { question: "What payment methods are accepted ?", answer: "We accept mobile money, cards, and bank transfers." },
    { question: "When do sellers receive payments ?", answer: "Payments are processed within 3–5 business days." },
    { question: "How to create an account on SokoLink ?", answer: "Duplicate FAQ example." },
  
  ];

  return (
    
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
      {/* Heading */}
      <div className="text-center py-16 px-4 bg-[#eaf4f3]">
        <h1 className="text-3xl font-semibold">
          How can we <span className="text-teal-500">help you ?</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Find answers to common questions or get in touch with our support team
        </p>

        {/* Search bar */}
        <div className="flex items-center justify-center mt-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 flex-grow">
        {/* Sidebar */}
        <aside>
          <h2 className="font-semibold mb-4">Categories</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="bg-teal-50 text-teal-600 px-3 py-2 rounded-md font-medium">
              All Topics
            </li>
            <li className="hover:text-teal-600 cursor-pointer">Getting Started</li>
            <li className="hover:text-teal-600 cursor-pointer">Buying & Orders</li>
            <li className="hover:text-teal-600 cursor-pointer">Selling Products</li>
            <li className="hover:text-teal-600 cursor-pointer">Payments & Billing</li>
            <li className="hover:text-teal-600 cursor-pointer">Shipping & Delivery</li>
            <li className="hover:text-teal-600 cursor-pointer">Security & Privacy</li>
          </ul>
        </aside>

        {/* FAQ Section */}
        <section className="md:col-span-3">
          <h2 className="font-semibold text-lg mb-6">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 mb-4">{faqs.length} Articles found</p>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </div>

      {/* Still need help section */}
      <div className="bg-teal-50 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold">Still need help?</h2>
          <p className="text-gray-500 mt-2">
            Can’t find what you’re looking for? Our support team is here to help you succeed
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Live Chat */}
          <div className="bg-white p-6 rounded-lg shadow text-center border">
            <MessageCircle className="mx-auto text-red-400 mb-4" size={36} />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-500 mb-4">Get instant help from our support team</p>
            <button className="bg-gray-100 px-4 py-2 rounded-md text-gray-800 font-medium">
              Start Chat
            </button>
            <p className="text-sm text-gray-400 mt-3">24/7</p>
          </div>

          {/* Phone Support */}
          <div className="bg-white p-6 rounded-lg shadow text-center border">
            <Phone className="mx-auto text-teal-500 mb-4" size={36} />
            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
            <p className="text-gray-500 mb-4">Call for urgent matters</p>
            <p className="font-medium text-gray-800">+256 700 000 000</p>
            <p className="text-sm text-gray-400 mt-2">9 AM – 6 PM</p>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-lg shadow text-center border">
            <Mail className="mx-auto text-yellow-500 mb-4" size={36} />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">Send us detailed questions</p>
            <p className="font-medium text-gray-800">support@sokolink.com</p>
            <p className="text-sm text-gray-400 mt-2">24 hours response</p>
          </div>
        </div>
      </div>

      {/* Footer will come from your global layout */}
       <Footer />
    </div>
  );
};

export default HelpPage;
