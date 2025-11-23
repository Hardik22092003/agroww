import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaTractor } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Agroww</h1>
            <p className="text-xl text-gray-600">Choose your login type to continue</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/admin/login" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl mb-6 group-hover:from-gray-700 group-hover:to-gray-900 transition-all duration-300">
                  <FiUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Portal</h3>
                <p className="text-gray-600 mb-6">Manage platform operations, users, and system settings</p>
                <div className="inline-flex items-center text-gray-600 group-hover:text-gray-800 transition-colors">
                  <span className="font-medium">Access Admin Dashboard</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            <Link to="/login/farmer" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 group-hover:from-amber-600 group-hover:to-orange-700 transition-all duration-300">
                  <FaTractor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Farmer Portal</h3>
                <p className="text-gray-600 mb-6">Manage your crops, land, and agricultural operations</p>
                <div className="inline-flex items-center text-amber-600 group-hover:text-amber-700 transition-colors">
                  <span className="font-medium">Access Farm Dashboard</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            <Link to="/login/investor" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl mb-6 group-hover:from-blue-600 group-hover:to-teal-700 transition-all duration-300">
                  <FiTrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Investor Portal</h3>
                <p className="text-gray-600 mb-6">Explore investment opportunities in agriculture</p>
                <div className="inline-flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="font-medium">Access Investment Dashboard</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600">Don't have an account? <Link to="/signup/farmer" className="text-amber-600 hover:text-amber-500 font-medium">Sign up as Farmer</Link> or <Link to="/signup/investor" className="text-blue-600 hover:text-blue-500 font-medium">Sign up as Investor</Link></p>
            <div className="mt-4"><Link to="/" className="text-gray-500 hover:text-gray-700">← Back to home</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
