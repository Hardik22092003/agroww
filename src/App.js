import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./admin/pages/Users";
import AdminDashboard from "./admin/AdminDashboard";
import FarmerDashboard from "./farmer/FarmerDashboard";
import InvestorDashboard from "./investor/InvestorDashboard";
import Settings from "./admin/pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
