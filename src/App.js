import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
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
import GetAllContracts from "./farmer/GetallContracts";
import FarmerSignup from "./pages/FarmerSignup";
import InvestorSignup from "./pages/InvestorSignup";
import Unauthorized from "./pages/ErrorPage";

function App() {
  let username = localStorage.getItem("username");
  let role = localStorage.getItem("role");
 
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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login/farmer" element={<FarmerLogin />} />
        <Route path="/farmer" element={<FarmerDashboard/>} />
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/signup/farmer" element={<FarmerSignup />} />
        <Route path="/signup/investor" element={<InvestorSignup />} />
        <Route path="/farmer/allcontracts" element={<GetAllContracts />} />
        <Route path="/login/investor" element={<InvestorLogin />} />
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/investor/transactions" element={<TransactionHistory />} />
        <Route path="/investor/wallet" element={<WalletBalance />} />
        <Route path="/investor/settings" element={<InvestorSettings />} />
        <Route path="/investor/help" element={<HelpSupport />} />
        <Route path="/farmer/allcontracts" element={<GetAllContracts />} />
<Route path="*" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
