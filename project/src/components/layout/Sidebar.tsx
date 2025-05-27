import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Sprout, 
  CreditCard, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import Logo from '../ui/Logo';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Investments', path: '/stocks', icon: <Sprout size={20} /> },
    { name: 'Bank Accounts', path: '/bank-account', icon: <CreditCard size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/profile', icon: <Settings size={20} /> },
    { name: 'Help & Support', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-primary-600">Agroww</span>
            </Link>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`mr-3 ${isActive(item.path) ? 'text-primary-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-primary-700 mb-2">Need help?</h4>
              <p className="text-xs text-gray-600 mb-3">Contact our support team for assistance with your investments.</p>
              <Link to="/contact" className="text-xs font-medium text-primary-600 hover:text-primary-700">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;