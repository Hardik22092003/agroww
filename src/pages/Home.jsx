import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    useEffect(() => {
      axios.get("https://agroww.onrender.com/farmer/h1")
    }, []);
  return (
   <div className="font-sans bg-[#f1fdf8] min-h-screen">
      {/* Navbar Placeholder (for consistent top margin) */}
      <div className="h-[80px]" />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Invest in Farms,{" "}
            <span className="text-emerald-600">Harvest Returns</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Join thousands of investors funding sustainable agriculture projects
            and earning competitive returns while supporting farmers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <div className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow transition">
              Start Investing →
            </div>
            <SignUpDropdown />
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center md:justify-start">
            {[
              "No hidden fees",
              "Transparent investments",
              "Secure platform",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <CheckCircle className="text-emerald-600 w-5 h-5" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/hero.jpg"
            alt="Farmer in Field"
            className="rounded-2xl shadow-lg max-w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
};
const SignUpDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-6 py-3 border border-emerald-600 rounded-md text-emerald-600 hover:bg-emerald-50"
      >
        Sign Up
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-56 z-50">
          <button
            onClick={() => navigate("/signup/farmer")}
            className="block w-full text-left px-4 py-2 hover:bg-emerald-50"
          >
            Sign up as Farmer
          </button>
          <button
            onClick={() => navigate("/signup/investor")}
            className="block w-full text-left px-4 py-2 hover:bg-emerald-50"
          >
            Sign up as Investor
          </button>
        </div>
      )}
    </div>
  );
};
export default Home;
