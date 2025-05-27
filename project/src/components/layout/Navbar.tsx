import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <div className="hidden md:block relative w-full max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search farms, crops..."
                  className="input pl-10 w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-primary-600 focus:outline-none">
              <Bell size={20} />
            </button>
            
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-10 border border-gray-100 animate-fade-in">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/bank-account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Bank Accounts
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search bar */}
      {showMobileMenu && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farms, crops..."
              className="input pl-10 w-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;