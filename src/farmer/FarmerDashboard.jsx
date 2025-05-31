import React, { useState } from "react";
import { FaTractor, FaFileContract, FaHome, FaUpload } from "react-icons/fa";
import Status from "./Status";
import FarmerDashAccess from "./FarmerDashAccess";
import ContractForm from "./_FarmerComponents/ContractForm";
import GetAllContracts from "./GetallContracts";

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome {localStorage.getItem("username")} to Farmer Dashboard
            </h2>
           
            <div>
              <img
                src="/farmerdashboard.jpg"
                alt="Farmer Insight"
                className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <p className="text-2xl text-green-600 font-bold">Your Contracts</p>
              <div className="mt-4">
            <GetAllContracts/>
                 </div>

               </div>
          </div>
        );
      case "land":
        return <Status />;
      case "upload":
        return <FarmerDashAccess />;
      case "contract":
        return <ContractForm />;
      default:
        return null;
    }
  };

  const activeTabToTitle = (tab) => {
    switch (tab) {
      case "dashboard":
        return "";
      case "land":
        return "Land Status";
      case "upload":
        return "Upload Documents";
      case "contract":
        return "Upload Contract";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Farmer Panel</h1>
        <nav className="space-y-4">
          <button
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaHome className="mr-3" />
            Dashboard
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              activeTab === "land"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("land")}
          >
            <FaTractor className="mr-3" />
            Land Status
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              activeTab === "upload"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            <FaUpload className="mr-3" />
            Upload Documents
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              activeTab === "contract"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("contract")}
          >
            <FaFileContract className="mr-3" />
            Upload Contract
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 pt-6 pb-10">
        {activeTab !== "dashboard" && (
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            {activeTabToTitle(activeTab)}
          </h1>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">{renderContent()}</div>
      </main>
    </div>
  );
}
