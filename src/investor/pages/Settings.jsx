import React, { useState } from "react";

export default function InvestorSettings() {
  const [bank, setBank] = useState({
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  });

  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Profile Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Full Name"
            defaultValue="John Doe"
          />
          <input
            type="email"
            className="border p-2 rounded w-full"
            placeholder="Email Address"
            defaultValue="john@example.com"
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Phone"
            defaultValue="+91 9876543210"
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="City"
            defaultValue="Mumbai"
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Profile
        </button>
      </div>

      {/* Bank Account Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Bank Account Details
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Account Holder Name"
            value={bank.accountName}
            onChange={(e) => setBank({ ...bank, accountName: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Account Number"
            value={bank.accountNumber}
            onChange={(e) =>
              setBank({ ...bank, accountNumber: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="IFSC Code"
            value={bank.ifsc}
            onChange={(e) => setBank({ ...bank, ifsc: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Bank Name"
            value={bank.bankName}
            onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Bank Details
        </button>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Notification Settings
        </h2>
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Receive email notifications</span>
        </label>
      </div>

      {/* Change Password Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Change Password
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Old Password"
            className="border p-2 rounded w-full"
            value={password.old}
            onChange={(e) => setPassword({ ...password, old: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 rounded w-full"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-2 rounded w-full"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Update Password
        </button>
      </div>
    </div>
  );
}
