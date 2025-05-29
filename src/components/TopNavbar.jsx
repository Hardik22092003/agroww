import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaGlobeAsia } from "react-icons/fa";

const TopNavbar = () => {
  const [language, setLanguage] = useState("en");
  const [loginOpen, setLoginOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const loginRef = useRef();
  const langRef = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
    // Optional: i18n.changeLanguage(lang)
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-indigo-700">Agroww</div>

      <div className="flex gap-6 items-center text-gray-800 text-sm font-medium">
        <Link to="/" className="hover:text-indigo-600">Home</Link>

        {/* Login Dropdown */}
        <div className="relative" ref={loginRef}>
          <button
            className="flex items-center gap-1 hover:text-indigo-600"
            onClick={() => setLoginOpen((prev) => !prev)}
          >
            <span>Login</span>
            <FiChevronDown size={16} />
          </button>
          {loginOpen && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-40 z-10 animate-fadeIn">
              <Link to="/login/farmer" className="block px-4 py-2 hover:bg-gray-100">Farmer</Link>
              <Link to="/login/investor" className="block px-4 py-2 hover:bg-gray-100">Investor</Link>
              <Link to="/admin/login" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
            </div>
          )}
        </div>

        <Link to="/faq" className="hover:text-indigo-600">FAQ</Link>
        <Link to="/about" className="hover:text-indigo-600">About Us</Link>
        <Link to="/help" className="hover:text-indigo-600">Help Desk</Link>
        <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            className="flex items-center gap-1 hover:text-indigo-600"
            onClick={() => setLangOpen((prev) => !prev)}
          >
            <FaGlobeAsia size={16} />
            <span>{language === "en" ? "English" : "हिंदी"}</span>
            <FiChevronDown size={16} />
          </button>
          {langOpen && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-32 z-10 animate-fadeIn">
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
