import React, { useEffect } from "react";
import axios from "axios";
const Home = () => {
    useEffect(() => {
      axios.get("https://agroww.onrender.com/farmer/h1")
    }, []);
  return (
    <div className="font-sans">

      {/* Hero Banner */}
      <section className="relative w-full h-[75vh]">
        <img
          src="/hero.jpg"
          alt="Hero Agroww"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Empowering Farmers with Technology
          </h1>
        </div>
        {/* Tagline at Bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center px-4">
          <p className="text-lg md:text-xl drop-shadow-md max-w-3xl">
            Revolutionizing agriculture by connecting farmers and investors through land sharing, technology, and trust.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-emerald-700">Our Vision</h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          <span className="font-semibold text-emerald-800">Agroww</span> is more than just a farming platform — it’s a new way of connecting agriculture with the power of investment.
          Our goal is to empower farmers by enabling them to list their agricultural land on our platform and sell fractional shares of their land to investors, similar to how the stock market works.
          <br /><br />
          Investors, based on their interests and budgets, can purchase one or multiple shares, gaining partial ownership and future yield benefits.
          This model not only provides farmers with direct capital for their agricultural needs but also opens up agriculture as a powerful, transparent, and accessible investment class for everyone.
          <br /><br />
          To maintain transparency and credibility, we have a robust <span className="font-medium text-emerald-600">admin verification system</span> in place that ensures each land listing, investor, and transaction is thoroughly vetted.
        </p>
      </section>

      {/* What is Agroww Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-800">What is Agroww?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Agroww is a pioneering agri-tech platform that empowers farmers by enabling them to
          list their agricultural land and sell fractional shares to investors. Think of it like
          the stock market for farmland—where farmers get capital, and investors gain smart access
          to agriculture. Alongside, we offer advanced tools for crop monitoring, marketplace
          trade, and data-driven farming decisions, all under a verified and secure system.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12 text-emerald-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <img
              src="/landshare.jpg"
              alt="Land Share Trading"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-emerald-700">Land Share Trading</h3>
            <p className="text-gray-600">
              Farmers can list their land and sell fractional shares to verified investors, just like stocks.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <img
              src="/verify.jpg"
              alt="Admin Verification"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-emerald-700">Admin Verification</h3>
            <p className="text-gray-600">
              Secure and transparent system to verify land details, farmer identities, and investor profiles.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <img
              src="/smartfarming.jpg"
              alt="AI Tools"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-emerald-700">Investor Farmer MarketPlace</h3>
            <p className="text-gray-600">
              Investors browse verified land listings, assess location, soil type, crops and they can invest in multiple lands as per interest and budget.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
