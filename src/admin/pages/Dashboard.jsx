// src/admin/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import Charts from "../../components/Charts";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");

  const stats = [
    {
      title: "Total Users",
      value: 1520,
      icon: <FiUsers size={24} />,
      color: "border-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Farmers",
      value: 600,
      icon: <FiUserCheck size={24} />,
      color: "border-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Investors",
      value: 220,
      icon: <FiBriefcase size={24} />,
      color: "border-yellow-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Revenue",
      value: "₹12,300",
      icon: <FiDollarSign size={24} />,
      color: "border-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  const listings = [
    { id: 1, location: "5 Acres in Indore", status: "Pending" },
    { id: 2, location: "3 Acres in Bhopal", status: "Approved" },
    { id: 3, location: "7 Acres in Jabalpur", status: "Rejected" },
    { id: 4, location: "2 Acres in Ujjain", status: "Pending" },
  ];

  const filteredListings =
    activeTab === "All"
      ? listings
      : listings.filter((l) => l.status === activeTab);

  return (
    <div className="p-6 space-y-8 bg-[#f5f7fa] min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ title, value, icon, color, iconBg, iconColor }) => (
          <div
            key={title}
            className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 ${color} p-5 flex items-center space-x-4`}
          >
            <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>
              {icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{title}</p>
              <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Overview
        </h2>
        <Charts />
      </div>

      {/* Pending Verifications */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Verifications
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between text-gray-700">
            <span className="flex items-center space-x-2">
              <FiClock className="text-yellow-500" />{" "}
              <span>Farmer Aadhar Pending</span>
            </span>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </li>
          <li className="flex items-center justify-between text-gray-700">
            <span className="flex items-center space-x-2">
              <FiClock className="text-yellow-500" />{" "}
              <span>Land Docs Review</span>
            </span>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </li>
        </ul>
      </div>

      {/* Recent Land Listings */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Land Listings
        </h2>
        <div className="flex gap-4 mb-4">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 border border-gray-300 hover:bg-indigo-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredListings.map(({ id, location, status }) => (
            <li
              key={id}
              className="py-3 flex justify-between items-center text-gray-700"
            >
              <span>{location}</span>
              <span
                className={`text-sm flex items-center space-x-1 ${
                  status === "Approved"
                    ? "text-green-600"
                    : status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status === "Approved" && <FiCheckCircle />}
                {status === "Pending" && <FiClock />}
                {status === "Rejected" && <FiXCircle />}
                <span>{status}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>✅ Investor Ravi funded ₹50,000 for land ID #1023</li>
          <li>📄 New land listing by Farmer Meena</li>
          <li>🔄 Admin approved verification for Farmer ID #204</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
