import React, { useState } from "react";
import { FaTractor, FaFileContract, FaHome, FaUpload, FaPlus, FaEdit, FaEye, FaRupeeSign, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { FiUsers, FiTrendingUp, FiMapPin } from "react-icons/fi";
import Status from "./Status";
import FarmerDashAccess from "./FarmerDashAccess";
import ContractForm from "./_FarmerComponents/ContractForm";
import AuthHandler from "../components/AuthHandler";

export default function FarmerDashboard() {
	const [activeTab, setActiveTab] = useState("dashboard");

	const [landListings] = useState([
		{
			id: 1,
			landName: "Green Valley Farm",
			location: "Pune, Maharashtra",
			totalArea: "5.2 acres",
			listedArea: "3.0 acres",
			pricePerShare: 2500,
			totalShares: 120,
			soldShares: 75,
			status: "Active",
			dateCreated: "2024-12-15",
			image: "/land1.jpg"
		},
		{
			id: 2,
			landName: "Sunrise Agricultural Land",
			location: "Nashik, Maharashtra",
			totalArea: "8.5 acres",
			listedArea: "6.0 acres",
			pricePerShare: 3200,
			totalShares: 200,
			soldShares: 45,
			status: "Active",
			dateCreated: "2024-11-28",
			image: "/land2.jpg"
		},
		{
			id: 3,
			landName: "Heritage Farmstead",
			location: "Satara, Maharashtra",
			totalArea: "12.0 acres",
			listedArea: "10.0 acres",
			pricePerShare: 1800,
			totalShares: 400,
			soldShares: 400,
			status: "Sold Out",
			dateCreated: "2024-10-10",
			image: "/land3.jpg"
		}
	]);

	const totalRevenue = landListings.reduce((sum, land) => sum + (land.soldShares * land.pricePerShare), 0);
	const totalShares = landListings.reduce((sum, land) => sum + land.totalShares, 0);
	const soldShares = landListings.reduce((sum, land) => sum + land.soldShares, 0);

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return (
					<div className="space-y-8">
						<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
							<div className="flex items-center justify-between">
								<div>
									<h2 className="text-3xl font-bold mb-2">Welcome Back, Farmer! 🌾</h2>
									<p className="text-green-100">Manage your land listings and track your agricultural investments</p>
								</div>
								<div className="hidden md:block">
									<img src="/farmerdashboard.jpg" alt="Farmer" className="w-32 h-32 rounded-full object-cover border-4 border-white/20" />
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Total Revenue</p>
										<p className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</p>
									</div>
									<div className="bg-blue-100 p-3 rounded-full">
										<FaRupeeSign className="text-blue-600 text-xl" />
									</div>
								</div>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Active Listings</p>
										<p className="text-2xl font-bold text-gray-800">{landListings.filter(l => l.status === 'Active').length}</p>
									</div>
									<div className="bg-green-100 p-3 rounded-full">
										<FiMapPin className="text-green-600 text-xl" />
									</div>
								</div>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Shares Sold</p>
										<p className="text-2xl font-bold text-gray-800">{soldShares}/{totalShares}</p>
									</div>
									<div className="bg-purple-100 p-3 rounded-full">
										<FiUsers className="text-purple-600 text-xl" />
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-lg p-6">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-2xl font-bold text-gray-800">Your Land Listings</h3>
								<button 
									onClick={() => setActiveTab("contract")}
									className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									<FaPlus /> Create New Listing
								</button>
							</div>

							{landListings.length === 0 ? (
								<div className="text-center py-12">
									<FaTractor className="text-6xl text-gray-300 mx-auto mb-4" />
									<h4 className="text-xl font-semibold text-gray-600 mb-2">No Land Listings Yet</h4>
									<p className="text-gray-500 mb-6">Start by creating your first land listing to attract investors</p>
									<button 
										onClick={() => setActiveTab("contract")}
										className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
									>
										Create Your First Listing
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{landListings.map((land) => (
										<div key={land.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
											<div className="relative">
												<img 
													src={land.image} 
													alt={land.landName}
													className="w-full h-48 object-cover"
												/>
												<div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
													land.status === 'Active' ? 'bg-green-100 text-green-800' : 
													land.status === 'Sold Out' ? 'bg-blue-100 text-blue-800' : 
													'bg-gray-100 text-gray-800'
												}`}>
													{land.status}
												</div>
											</div>
                      
											<div className="p-6">
												<h4 className="text-xl font-bold text-gray-800 mb-2">{land.landName}</h4>
												<div className="flex items-center text-gray-600 mb-4">
													<FaMapMarkerAlt className="mr-2" />
													<span>{land.location}</span>
												</div>

												<div className="grid grid-cols-2 gap-4 mb-4">
													<div>
														<p className="text-sm text-gray-500">Listed Area</p>
														<p className="font-semibold text-gray-800">{land.listedArea}</p>
													</div>
													<div>
														<p className="text-sm text-gray-500">Price per Share</p>
														<p className="font-semibold text-gray-800">₹{land.pricePerShare}</p>
													</div>
												</div>

												<div className="mb-4">
													<div className="flex justify-between text-sm mb-2">
														<span>Shares Progress</span>
														<span>{land.soldShares}/{land.totalShares}</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-2">
														<div 
															className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
															style={{ width: `${(land.soldShares / land.totalShares) * 100}%` }}
														></div>
													</div>
													<p className="text-xs text-gray-500 mt-1">
														{((land.soldShares / land.totalShares) * 100).toFixed(1)}% sold
													</p>
												</div>

												<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
													<div className="flex items-center">
														<FaCalendarAlt className="mr-1" />
														<span>Listed: {new Date(land.dateCreated).toLocaleDateString()}</span>
													</div>
													<div className="font-semibold text-green-600">
														Revenue: ₹{(land.soldShares * land.pricePerShare).toLocaleString()}
													</div>
												</div>

												<div className="flex gap-2">
													<button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
														<FaEye /> View Details
													</button>
													<button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
														<FaEdit /> Edit Listing
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<button 
								onClick={() => setActiveTab("contract")}
								className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-6 rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<FaPlus className="text-2xl mb-3" />
								<h4 className="font-bold text-lg">Create New Listing</h4>
								<p className="text-green-100 text-sm">List more land for investment</p>
							</button>

							<button 
								onClick={() => setActiveTab("upload")}
								className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-6 rounded-xl hover:from-blue-500 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<FaUpload className="text-2xl mb-3" />
								<h4 className="font-bold text-lg">Upload Documents</h4>
								<p className="text-blue-100 text-sm">Add land verification docs</p>
							</button>

							<button 
								onClick={() => setActiveTab("land")}
								className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 rounded-xl hover:from-purple-500 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<FiTrendingUp className="text-2xl mb-3" />
								<h4 className="font-bold text-lg">Land Status</h4>
								<p className="text-purple-100 text-sm">Track your land portfolio</p>
							</button>
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
				return "Land Status & Analytics";
			case "upload":
				return "Upload Land Documents";
			case "contract":
				return "Create New Land Listing";
			default:
				return "";
		}
	};

	return (
		<AuthHandler expectedRole="farmer">
			<div className="min-h-screen flex bg-gradient-to-br from-green-50 to-emerald-50">
			<aside className="w-64 bg-white shadow-xl p-6 space-y-6 border-r border-gray-200">
				<div className="text-center">
					<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-4">
						<FaTractor className="text-3xl mx-auto mb-2" />
						<h1 className="text-xl font-bold">Farmer Panel</h1>
					</div>
				</div>
        
				<nav className="space-y-3">
					<button
						className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
							activeTab === "dashboard"
								? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
								: "text-gray-700 hover:bg-green-50 hover:text-green-700"
						}`}
						onClick={() => setActiveTab("dashboard")}
					>
						<FaHome className="mr-3" />
						Dashboard
					</button>

					<button
						className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
							activeTab === "land"
								? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
								: "text-gray-700 hover:bg-green-50 hover:text-green-700"
						}`}
						onClick={() => setActiveTab("land")}
					>
						<FaTractor className="mr-3" />
						Land Status
					</button>

					<button
						className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
							activeTab === "upload"
								? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
								: "text-gray-700 hover:bg-green-50 hover:text-green-700"
						}`}
						onClick={() => setActiveTab("upload")}
					>
						<FaUpload className="mr-3" />
						Upload Documents
					</button>

					<button
						className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
							activeTab === "contract"
								? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
								: "text-gray-700 hover:bg-green-50 hover:text-green-700"
						}`}
						onClick={() => setActiveTab("contract")}
					>
						<FaFileContract className="mr-3" />
						Create Listing
					</button>
				</nav>

				<div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
					<div className="text-center">
						<FiTrendingUp className="text-2xl text-green-600 mx-auto mb-2" />
						<p className="text-sm font-semibold text-green-800">Growing Together</p>
						<p className="text-xs text-green-600">Agroww Platform</p>
					</div>
				</div>
			</aside>

			<main className="flex-1 px-8 pt-6 pb-10 overflow-y-auto">
				{activeTab !== "dashboard" && (
					<div className="mb-6">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
							{activeTabToTitle(activeTab)}
						</h1>
						<div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
					</div>
				)}
				<div className={activeTab === "dashboard" ? "" : "bg-white p-8 rounded-xl shadow-lg"}>
					{renderContent()}
				</div>
			</main>
			</div>
		</AuthHandler>
	);
}
