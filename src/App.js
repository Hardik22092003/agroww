import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./admin/pages/Users";
import AdminDashboard from "./admin/AdminDashboard";
import FarmerDashboard from "./farmer/FarmerDashboard";
import InvestorDashboard from "./investor/InvestorDashboard";
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
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
       <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<HelpDesk />} />
        <Route path="/contact" element={<Contact />} />     
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login/farmer" element={<FarmerLogin />} />
<Route path="/login/investor" element={<InvestorLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
