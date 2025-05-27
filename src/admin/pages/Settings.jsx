// src/admin/pages/Settings.jsx
import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved (dummy)");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password changed (dummy)");
  };

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>

      {/* Profile Info */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Profile Info</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Save Profile
          </button>
        </form>
      </section>

      {/* Password Change */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="current">
              Current Password
            </label>
            <input
              id="current"
              name="current"
              type="password"
              value={password.current}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="new">
              New Password
            </label>
            <input
              id="new"
              name="new"
              type="password"
              value={password.new}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white rounded-2xl shadow-md p-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Notification Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="emailAlerts"
              checked={notifications.emailAlerts}
              onChange={handleNotificationsChange}
              className="form-checkbox"
            />
            <span>Email Alerts</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="smsAlerts"
              checked={notifications.smsAlerts}
              onChange={handleNotificationsChange}
              className="form-checkbox"
            />
            <span>SMS Alerts</span>
          </label>
        </div>
      </section>
    </div>
  );
};

export default Settings;
