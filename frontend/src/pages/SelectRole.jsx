import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function SelectRole() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (!urlToken) {
      navigate('/login?error=invalid_token');
      return;
    }
    setToken(urlToken);
  }, [searchParams, navigate]);

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/select-role`, { token: token, role: selectedRole });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('username', response.data.data.user.username);
        localStorage.setItem('role', response.data.data.user.role);
        localStorage.setItem('userId', response.data.data.user.id);
        if (selectedRole === 'farmer') navigate('/farmer');
        else navigate('/investor');
      }
    } catch (error) {
      console.error('Role selection error:', error);
      setError(error.response?.data?.message || 'Failed to select role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Role</h2>
          <p className="text-gray-600">Select how you'd like to use Agroww</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
        <div className="space-y-4 mb-8">
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedRole === 'farmer' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`} onClick={() => setSelectedRole('farmer')}>
            <div className="flex items-center">
              <input type="radio" name="role" value="farmer" checked={selectedRole === 'farmer'} onChange={() => setSelectedRole('farmer')} className="text-green-600 focus:ring-green-500" />
              <div className="ml-3"><h3 className="text-lg font-semibold text-gray-800">🌾 Farmer</h3><p className="text-gray-600 text-sm">List your farmland for investment and get funding for your crops</p></div>
            </div>
          </div>
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedRole === 'investor' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => setSelectedRole('investor')}>
            <div className="flex items-center">
              <input type="radio" name="role" value="investor" checked={selectedRole === 'investor'} onChange={() => setSelectedRole('investor')} className="text-blue-600 focus:ring-blue-500" />
              <div className="ml-3"><h3 className="text-lg font-semibold text-gray-800">💰 Investor</h3><p className="text-gray-600 text-sm">Invest in agricultural projects and earn returns from farming</p></div>
            </div>
          </div>
        </div>
        <button onClick={handleRoleSelection} disabled={!selectedRole || isLoading} className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${selectedRole === 'farmer' ? 'bg-green-600 hover:bg-green-700' : selectedRole === 'investor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} disabled:opacity-50 disabled:cursor-not-allowed`}>{isLoading ? (<div className="flex items-center justify-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Setting up your account...</div>) : (`Continue as ${selectedRole === 'farmer' ? 'Farmer' : selectedRole === 'investor' ? 'Investor' : 'User'}`)}</button>
        <div className="text-center mt-6"><p className="text-sm text-gray-500">You can change your role later in your account settings</p></div>
      </div>
    </div>
  );
}
