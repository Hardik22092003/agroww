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


      <h1 className="text-3xl font-bold text-green-700">Farmer Dashboard</h1>
      <img src="image.png" alt="img" className="rounded-lg"></img>
      <p className="mt-2 text-gray-600">Here you can manage your lands, check investments and more.</p>
      <p className="mt-2 text-gray-600">Manage your lands, check investments and more.</p>
      <div className="my-10">

      <BannerNav/>
      </div>
    <Status/>
   
    <FarmerDashAccess/>
    <Some/>
    <ContractForm/>


      
    </div>
  );
}
