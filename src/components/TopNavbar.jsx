import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaGlobeAsia } from "react-icons/fa";

const TopNavbar = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    // future: i18n.changeLanguage(lang)
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-indigo-700">Agroww</div>

      <div className="flex gap-6 items-center text-gray-800 text-sm font-medium">
        <Link to="/" className="hover:text-indigo-600">Home</Link>

        {/* Login Dropdown */}
        <div className="group relative cursor-pointer">
          <div className="flex items-center gap-1 hover:text-indigo-600">
            <span>Login</span>
            <FiChevronDown size={16} />
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 z-10">
            <Link to="/login/farmer" className="block px-4 py-2 hover:bg-gray-100">Farmer</Link>
            <Link to="/login/investor" className="block px-4 py-2 hover:bg-gray-100">Investor</Link>
            <Link to="/admin/login" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
          </div>
        </div>

        <Link to="/faq" className="hover:text-indigo-600">FAQ</Link>
        <Link to="/about" className="hover:text-indigo-600">About Us</Link>
        <Link to="/help" className="hover:text-indigo-600">Help Desk</Link>
        <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

        {/* Language Switcher */}
        <div className="group relative cursor-pointer">
          <div className="flex items-center gap-1 hover:text-indigo-600">
            <FaGlobeAsia size={16} />
            <span>{language === "en" ? "English" : "हिंदी"}</span>
            <FiChevronDown size={16} />
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-32 z-10">
            <button
              onClick={() => toggleLanguage("en")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage("hi")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
