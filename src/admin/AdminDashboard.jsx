import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";

const AdminDashboard = () => {
  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route index element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}; 

export default AdminDashboard;
