import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import Logo from '../../components/ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">Agroww</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Agroww is revolutionizing agricultural investments by connecting investors with farmers to create sustainable growth and competitive returns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Invest</h3>
            <ul className="space-y-3">
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/investments" className="text-gray-400 hover:text-white transition-colors">Investment Options</Link></li>
              <li><Link to="/success-stories" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  <a href="mailto:support@agroww.com" className="text-gray-400 hover:text-white transition-colors">
                    support@agroww.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition-colors">
                    +91 1234 567 890
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Agroww. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;