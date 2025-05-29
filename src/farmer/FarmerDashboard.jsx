import React from "react";
import Status from "./Status";
import FarmerDashAccess from "./FarmerDashAccess";
import BannerNav from "./BannerNav";
import Some from "./Some";
import ContractForm from "./_FarmerComponents/ContractForm";

export default function FarmerDashboard() {
  return (
    <div className="p-10 mx-auto">
      <h1 className="text-2xl">
        <span className="text-3xl font-bold"> Welcome</span> Xyz,
      </h1>

      <h1 className="text-3xl font-bold text-green-700 mt-2">Farmer Dashboard</h1>

      {/* Banner Section with overlay text */}
      <div className="relative mt-4 rounded-lg overflow-hidden">
        <img
          src="bg.jpg"
          alt="Updated Banner"
          className="w-full h-70 object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-white/80 px-4 py-2 rounded shadow text-gray-700">
          <p className="text-md font-medium">
            Here you can manage your lands, check investments and more.
          </p>
        </div>
      </div>

      {/* Navigation under banner */}
      <div className="my-10">
        <BannerNav />
      </div>

      <Status />
      <FarmerDashAccess />
      <Some />
      <ContractForm />
    </div>
  );
}
