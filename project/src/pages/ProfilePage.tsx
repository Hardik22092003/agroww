import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Shield, Bell, CreditCard, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '9876543210',
    address: '123 Main Street, Bangalore, Karnataka, India'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and account preferences</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'profile' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'security' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'notifications' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-24 w-24 rounded-full"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
                        <User size={48} className="text-primary-600" />
                      </div>
                    )}
                    <button className="mt-4 text-sm text-primary-600 font-medium">
                      Change Photo
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                      
                      <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <textarea
                          name="address"
                          rows={3}
                          className="input w-full"
                          value={formData.address}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      
                      <div className="flex space-x-3 pt-2">
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setFormData(profile);
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{profile.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{profile.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Connected Accounts</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Google</h3>
                        <p className="text-sm text-gray-600">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Facebook</h3>
                        <p className="text-sm text-gray-600">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Danger Zone</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <LogOut size={20} className="text-red-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium text-red-800">Log Out</h3>
                      <p className="text-sm text-red-700 mb-3">Log out from all devices</p>
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                        onClick={logout}
                      >
                        Log Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
                <form className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                  />
                  
                  <div className="pt-2">
                    <Button variant="primary">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication</h2>
                <div className="flex items-start">
                  <Shield size={24} className="text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Enhance Your Account Security</h3>
                    <p className="text-gray-600 mb-4">
                      Two-factor authentication adds an extra layer of security to your account. In addition to your password, you'll need to enter a code that we'll send to your phone.
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Login Sessions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Current Session</h3>
                        <p className="text-sm text-gray-600">Chrome on Windows • IP: 192.168.1.1</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Active Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Bell size={20} className="text-primary-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  </div>
                  
                  <div className="space-y-3 ml-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Investment Updates</p>
                        <p className="text-sm text-gray-600">Receive updates about your investments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Harvest Notifications</p>
                        <p className="text-sm text-gray-600">Get notified when your investments are about to be harvested</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Payment Confirmations</p>
                        <p className="text-sm text-gray-600">Receive confirmations for deposits and withdrawals</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">New Investment Opportunities</p>
                        <p className="text-sm text-gray-600">Get notified about new farms available for investment</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-4">
                    <CreditCard size={20} className="text-primary-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                  </div>
                  
                  <div className="space-y-3 ml-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Security Alerts</p>
                        <p className="text-sm text-gray-600">Receive SMS for login attempts and security alerts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Transaction Confirmations</p>
                        <p className="text-sm text-gray-600">Get SMS confirmations for transactions over ₹10,000</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-4">
                    <Mail size={20} className="text-primary-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Marketing Preferences</h3>
                  </div>
                  
                  <div className="space-y-3 ml-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Newsletter</p>
                        <p className="text-sm text-gray-600">Receive our monthly newsletter with tips and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Promotional Emails</p>
                        <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button variant="primary">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;