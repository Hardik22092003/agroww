import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard";
import FarmerDashboard from "./farmer/FarmerDashboard";
import InvestorDashboard from "./investor/InvestorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
