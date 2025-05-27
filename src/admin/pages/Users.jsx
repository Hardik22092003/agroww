import React, { useState } from "react";
import { FiSearch, FiEdit2, FiEye, FiSlash } from "react-icons/fi";

const dummyUsers = [
  { id: 1, name: "Ravi Sharma", role: "Farmer", email: "ravi@example.com", status: "Verified" },
  { id: 2, name: "Meena Patel", role: "Investor", email: "meena@example.com", status: "Pending" },
  { id: 3, name: "Ankit Verma", role: "Farmer", email: "ankit@example.com", status: "Verified" },
  { id: 4, name: "Sneha Joshi", role: "Investor", email: "sneha@example.com", status: "Pending" },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Users</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Roles</option>
          <option value="Farmer">Farmer</option>
          <option value="Investor">Investor</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-gray-600">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Verified" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <FiEye />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiSlash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
