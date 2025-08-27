import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const TopNavbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-white tracking-wide">
        🌱 Agroww
      </div>

      <div className="flex gap-8 items-center text-white text-sm font-medium">
        <Link to="/" className="hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform">
          Home
        </Link>
        <div className="relative" ref={loginRef}>
          <button
            className="flex items-center gap-1 hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform"
            onClick={() => setLoginOpen((prev) => !prev)}
          >
            <span>Login</span>
            <FiChevronDown size={16} />
          </button>
          {loginOpen && (
            <div className="absolute bg-white shadow-xl rounded-lg mt-2 w-40 z-10 animate-fadeIn border border-gray-200 overflow-hidden">
              <Link 
                to="/login/farmer" 
                className="block px-4 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors duration-200"
              >
                🚜 Farmer
              </Link>
              <Link 
                to="/login/investor" 
                className="block px-4 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors duration-200"
              >
                💼 Investor
              </Link>
              <Link 
                to="/admin/login" 
                className="block px-4 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors duration-200"
              >
                🔐 Admin
              </Link>
            </div>
          )}
        </div>
        <Link to="/faq" className="hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform">
          FAQ
        </Link>
        <Link to="/about" className="hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform">
          About Us
        </Link>
        <Link to="/help" className="hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform">
          Help Desk
        </Link>
        <Link to="/contact" className="hover:text-emerald-200 transition-colors duration-200 hover:scale-105 transform">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
