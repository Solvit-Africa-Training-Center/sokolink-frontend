import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const About: React.FC = () => {
    const teamMembers = [
        {
            name: "Cyuzuzo Kwizera Olivier",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Leading our technical vision to build scalable solutions for the African marketplace.",
        },
        {
            name: "Cyuzuzo Kwizera Olivier",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Leading our technical vision to build scalable solutions for the African marketplace.",
        },
        {
            name: "Cyuzuzo Kwizera Olivier",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            bio: "Leading our technical vision to build scalable solutions for the African marketplace.",
        },
        {
            name: "Cyuzuzo Kwizera Olivier",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/men/76.jpg",
            bio: "Leading our technical vision to build scalable solutions for the African marketplace.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#eaf4f3]">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="text-center py-16 px-4 bg-[#eaf4f3]">
                <h1 className="text-3xl font-bold">
                    About <span className="text-teal-600">SokoLink</span>
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                    We’re on a mission to transform commerce across Africa by connecting
                    wholesalers, retailers, and customers in one unified marketplace.
                    Building bridges, creating opportunities, and empowering businesses to
                    grow together.
                </p>
            </section>

            {/* Mission, Vision, Impact */}
            <section className="bg-white py-16 px-6 grid md:grid-cols-2 gap-10 w-full px-[120px] mx-auto items-center ">
                <div className="flex flex-col gap-6">
                    <div className="max-w-[90%] space-y-10">
                    <div>
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                        <span className="bg-teal-600 text-white rounded-[8px] h-[40px] w-[40px] flex items-center justify-center">✓</span> Our Mission
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm">
                        To democratize access to quality products and create sustainable
                        economic opportunities across Africa by connecting businesses of all
                        sizes through technology, trust, and innovation.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                        <span className="bg-teal-600 text-white rounded-[8px] h-[40px] w-[40px] flex items-center justify-center">✓</span> Our Vision
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm">
                        To become Africa’s leading marketplace platform, where every
                        business has the tools and connections they need to thrive in the
                        digital economy.
                    </p>
                </div>
                        
                    </div>
                </div>
                {/* Impact */}

                <div className="bg-teal-600 text-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-xl mb-4">Our Impact</h3>
                    <p>1000+ Verified Business</p>
                    <p>2500+ Active Users</p>
                    <p>50,000+ Products Listed</p>
                    <p>4 Customers</p>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-[#eaf4f3] py-16 px-[120px]">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold">Our Core Values</h2>
                    <p className="mt-2 text-gray-600">
                        The principles that guide everything we do at SokoLink
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "True Openness",
                            desc: "Building lasting relationships through honest, transparent business practices.",
                        },
                        {
                            title: "Innovation",
                            desc: "Continuously improving our platform to serve African businesses better.",
                        },
                        {
                            title: "Community Focus",
                            desc: "Empowering local communities and supporting economic development.",
                        },
                        {
                            title: "Rwandan Vision",
                            desc: "Connecting businesses across the country to create a unified marketplace.",
                        },
                    ].map((value, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                        >
                            <h4 className="font-semibold">{value.title}</h4>
                            <p className="text-sm text-gray-600 mt-2">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="bg-white py-16 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold">Meet Our Team</h2>
                    <p className="mt-2 text-gray-600">
                        The passionate people building the future of African commerce
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {teamMembers.map((member, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white border rounded-lg p-6 text-center shadow hover:shadow-lg transition">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-28 h-28 mx-auto rounded-full mb-4"
                                    />
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-teal-600 text-sm font-medium">{member.role}</p>
                                    <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Ready to Join Our Mission */}
            <section className="bg-teal-700 text-white py-20 px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Join Our Mission?
                </h2>
                <p className="max-w-2xl mx-auto mb-6 text-gray-100">
                    Whether you're a wholesaler, retailer, or customer, there's a place
                    for you in the SokoLink community.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-teal-600 font-medium px-6 py-2 rounded-md hover:bg-gray-100">
                        Get started today
                    </button>
                    <button className="bg-transparent border border-white font-medium px-6 py-2 rounded-md hover:bg-white hover:text-teal-600">
                        Contact us
                    </button>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
