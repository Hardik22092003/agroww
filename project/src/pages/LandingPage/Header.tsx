import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-primary-600">Agroww</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="#how-it-works" className="text-gray-700 hover:text-primary-600 font-medium">
              How It Works
            </Link>
            <Link to="#investments" className="text-gray-700 hover:text-primary-600 font-medium">
              Investments
            </Link>
            <Link to="#faq" className="text-gray-700 hover:text-primary-600 font-medium">
              FAQ
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
              Sign In
            </Link>
            <Link to="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="#how-it-works"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="#investments"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Investments
              </Link>
              <Link
                to="#faq"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary" fullWidth>
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;