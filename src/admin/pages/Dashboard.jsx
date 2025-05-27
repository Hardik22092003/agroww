import React from "react";
import { FiUsers, FiUserCheck, FiBriefcase, FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: 1520, color: "bg-primary", icon: <FiUsers size={28} /> },
    { title: "Farmers", value: 600, color: "bg-secondary", icon: <FiUserCheck size={28} /> },
    { title: "Investors", value: 220, color: "bg-accent", icon: <FiBriefcase size={28} /> },
    { title: "Revenue", value: "₹12,300", color: "bg-green-500", icon: <FiDollarSign size={28} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map(({ title, value, color, icon }) => (
        <div
          key={title}
          className={`rounded-lg shadow-lg p-6 text-white ${color} flex flex-col justify-center`}
        >
          <div className="flex items-center space-x-3">
            <div>{icon}</div>
            <p className="text-sm font-semibold">{title}</p>
          </div>
          <h2 className="mt-4 text-3xl font-bold">{value}</h2>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
