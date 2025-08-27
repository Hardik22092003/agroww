import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiEye, FiEyeOff, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { FaGoogle, FaGithub, FaChartLine } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000/api';

const InvestorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { ...formData, role: 'investor' });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        navigate('/investor/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}?role=investor`;
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-10 left-10 text-white/20"><FiTrendingUp className="w-20 h-20" /></div>
        <div className="absolute top-1/3 right-20 text-white/10"><FaChartLine className="w-32 h-32" /></div>
        <div className="absolute bottom-20 left-20 text-white/15"><FiDollarSign className="w-24 h-24" /></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome Back, Investor!</h1>
            <p className="text-xl mb-8 text-white/90">Continue building your agricultural investment portfolio</p>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2"><FiDollarSign className="w-6 h-6" /><span>Smart Investments</span></div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2"><FiTrendingUp className="w-6 h-6" /><span>Growth Focused</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl mb-4"><FiTrendingUp className="w-8 h-8 text-white" /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Investor Portal</h2>
            <p className="text-gray-600">Access your investment dashboard</p>
          </div>
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FiMail className="h-5 w-5 text-gray-400" /></div>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FiLock className="h-5 w-5 text-gray-400" /></div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">{showPassword ? (<FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />) : (<FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />)}</button>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]">{isLoading ? (<div className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Signing In...</div>) : ('Sign In to Investment Dashboard')}</button>
          </form>
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleOAuthLogin('google')} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"><FaGoogle className="w-5 h-5 text-red-500 mr-2" />Google</button>
            <button onClick={() => handleOAuthLogin('github')} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"><FaGithub className="w-5 h-5 text-gray-900 mr-2" />GitHub</button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/investor/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up as an investor</Link></p>
            <div className="mt-4 space-y-2">
              <Link to="/investor/forgot-password" className="block text-sm text-blue-600 hover:text-blue-500">Forgot your password?</Link>
              <Link to="/" className="block text-sm text-gray-500 hover:text-gray-700">← Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorLogin;
