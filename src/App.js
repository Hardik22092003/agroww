import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./admin/pages/Users";
import AdminDashboard from "./admin/AdminDashboard";
import FarmerDashboard from "./farmer/FarmerDashboard";
import InvestorDashboard from "./investor/InvestorDashboard";
import TransactionHistory from "./investor/pages/TransactionHistory";
import WalletBalance from "./investor/pages/WalletBalance";
import InvestorSettings from "./investor/pages/Settings";
import HelpSupport from "./investor/pages/HelpSupport";
import Settings from "./admin/pages/Settings";
import TopNavbar from "./components/TopNavbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import HelpDesk from "./pages/HelpDesk";
import AdminLogin from "./pages/AdminLogin";
import FarmerLogin from "./pages/FarmerLogin";
import InvestorLogin from "./pages/InvestorLogin";

function App() {
  return (
    <Router>
      <TopNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<HelpDesk />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login/farmer" element={<FarmerLogin />} />
        <Route path="/login/investor" element={<InvestorLogin />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Farmer */}
        <Route path="/farmer" element={<FarmerDashboard />} />

        {/* Investor */}
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/investor/transactions" element={<TransactionHistory />} />
        <Route path="/investor/wallet" element={<WalletBalance />} />
        <Route path="/investor/settings" element={<InvestorSettings />} />
        <Route path="/investor/help" element={<HelpSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
