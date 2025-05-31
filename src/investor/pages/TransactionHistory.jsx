// src/investor/pages/TransactionHistory.jsx
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionHistory() {
  const transactions = [
    { id: 1, date: "2025-05-01", type: "Invested", amount: 5000 },
    { id: 2, date: "2025-05-15", type: "Profit", amount: 600 },
    { id: 3, date: "2025-06-01", type: "Invested", amount: 4500 },
  ];
let [contracts,setContracts]=useState([]);
 useEffect(()=>{
            axios.get(`https://agroww.onrender.com/investor/${localStorage.getItem("username")}/investedin`).then((res)=>{
                    console.log(res.data);
                    setContracts(res.data);
                }).catch((err)=>{
                    console.log(err);
    
                })
    
        },[])
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-center">
              <td className="p-2 border">{tx.date}</td>
              <td className="p-2 border">{tx.type}</td>
              <td className="p-2 border">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-2xl my-4 font-bold">Your Investment</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {contracts.map((land,idx) => (
            <div key={land.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={"/land4.jpg"} alt={"img "} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800">{land.contractName}</h2>
                <p className="text-gray-600">Crop: <span className="font-medium">{"Beans"}</span></p>
                <div className="flex justify-between">
                <p className="text-gray-600">Risk: <span className="text-yellow-700 font-semibold">{land.expectedROI}%</span></p>
                <p className="text-gray-600">Duration: {36}</p>
                  </div>
                
                <p className="text-green-700 font-bold mt-2">₹{land.unitPrice} / unit</p>
                <p className="text-sm mt-2 text-gray-500">{
                    "it is a Beans Land"}</p>
                    
                
                
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
