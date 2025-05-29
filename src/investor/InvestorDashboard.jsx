import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const landData = [
  {
    id: 1,
    image: "/land1.jpg",
    location: "Punjab, India",
    crop: "Wheat",
    risk: "Low",
    duration: "6 months",
    unitsAvailable: 80,
    unitsSold: 20,
    pricePerUnit: 5000,
    description: "Fertile land in Ludhiana with high wheat yield.",
  },
  {
    id: 2,
    image: "/land2.jpg",
    location: "Maharashtra, India",
    crop: "Cotton",
    risk: "Medium",
    duration: "5 months",
    unitsAvailable: 60,
    unitsSold: 30,
    pricePerUnit: 4200,
    description: "Well-irrigated land for cotton with moderate risk.",
  },
  {
    id: 3,
    image: "/land3.jpg",
    location: "Uttar Pradesh, India",
    crop: "Rice",
    risk: "High",
    duration: "7 months",
    unitsAvailable: 100,
    unitsSold: 60,
    pricePerUnit: 4800,
    description: "Floodplain rice land with high potential return.",
  },
  {
    id: 4,
    image: "/land4.jpg",
    location: "Gujarat, India",
    crop: "Groundnut",
    risk: "Low",
    duration: "4 months",
    unitsAvailable: 50,
    unitsSold: 40,
    pricePerUnit: 4500,
    description: "Low-risk land suitable for seasonal farming.",
  },
  {
    id: 5,
    image: "/land5.jpg",
    location: "West Bengal, India",
    crop: "Jute",
    risk: "Medium",
    duration: "6 months",
    unitsAvailable: 70,
    unitsSold: 20,
    pricePerUnit: 3900,
    description: "Great opportunity in fiber farming near riverside.",
  },
];

export default function InvestorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortDuration, setSortDuration] = useState("none");

  // Filter and sort logic
  const filteredLands = landData
    .filter((land) => {
      const matchesSearch =
        land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        land.crop.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === "All" || land.risk === riskFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortDuration === "Shortest") return parseInt(a.duration) - parseInt(b.duration);
      if (sortDuration === "Longest") return parseInt(b.duration) - parseInt(a.duration);
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Investor Panel</h2>
        <nav className="space-y-3">
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Dashboard Overview</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Document Verification</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Transaction History</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">My Portfolio & Stocks</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Wallet & Balance</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Settings</a>
          <a href="#" className="block hover:bg-green-700 p-2 rounded">Help & Support</a>
          <a href="#" className="block hover:bg-red-700 p-2 rounded">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Available Farmlands for Investment</h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Location or Crop"
            className="p-2 border rounded w-full"
          />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="All">All Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={sortDuration}
            onChange={(e) => setSortDuration(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="none">Sort by Duration</option>
            <option value="Shortest">Shortest</option>
            <option value="Longest">Longest</option>
          </select>
        </div>

        {/* Land Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLands.map((land) => (
            <div key={land.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={land.image} alt={land.crop} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800">{land.location}</h2>
                <p className="text-gray-600">Crop: <span className="font-medium">{land.crop}</span></p>
                <p className="text-gray-600">Risk: <span className="text-yellow-700 font-semibold">{land.risk}</span></p>
                <p className="text-gray-600">Duration: {land.duration}</p>
                <p className="text-gray-600">Units Available: {land.unitsAvailable}</p>
                <p className="text-gray-600">Units Sold: {land.unitsSold}</p>
                <p className="text-green-700 font-bold mt-2">₹{land.pricePerUnit} / unit</p>
                <p className="text-sm mt-2 text-gray-500">{land.description}</p>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
