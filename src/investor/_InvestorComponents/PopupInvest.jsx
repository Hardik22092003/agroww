import { useState } from "react";
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function PopupInvest({contractDetails,close}) {
    // if (!contractDetails) return null;
    let [units, setUnits] = useState(contractDetails.units || 1);
    let invest=()=>{
        console.log("Investing in contract:", contractDetails);
        axios.post(`https://agroww.onrender.com/investor/${contractDetails.userName}/newinvest`,{
            contractId: contractDetails.contractId,
            unitsBought: units,
            PricePerUnit: contractDetails.unitPrice,
            totalPrice: contractDetails.unitPrice * units.PopupInvest,
            farmerName: contractDetails.farmerName,
            nameContract: contractDetails.nameContract
        }).then((res)=>{
            console.log(res.data);
            console.log("Investment successful");
            toast.success("Investment successful!");
            close();
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleUnitsChange = (e) => {
        const inputValue = e.target.value;
      
        if (inputValue === '') {
            setUnits(1);
            return;
        }
        
        
        const numValue = parseInt(inputValue);
        
        
        if (numValue < 1) {
            setUnits(1);
        } else if (numValue > contractDetails.unitsLeft) {
            setUnits(contractDetails.unitsLeft);
        } else {
            setUnits(numValue);
        }
    };
    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Investment Details</h2>
                <p className="mb-4">You are investing in XYZ contract</p>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="units">
                        Contract Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text"
                        value={contractDetails.nameContract}
                        disabled
                    />
                </div>
                <div className="flex gap-3 items-center">

                <div className="mb-4 w-1/2">
                    <label className=" flex text-gray-700 text-sm font-bold mb-2" htmlFor="units">
                     <p>   Total Units</p> <p>
                             (available = {contractDetails.unitsLeft})
                            </p>
                    </label>
                    <input 
                        className="appearance-none block w-full  text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="units" 
                        type="number" 
                        min="1"
                        max={contractDetails.unitsLeft}
                        value={units}
                        onChange={handleUnitsChange}
                        placeholder="Enter number of units"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="units">
                        Price per Unit
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="units" 
                        type="number" 
                        min="1"
                        value={contractDetails.unitPrice}
                        disabled
                        />
                </div>
                        </div>
                        <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="units">
                        Total Investment Amount
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="units" 
                        type="number" 
                        min="1"
                       value={contractDetails.unitPrice * units}
                        disabled
                        />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                    <button 
                        onClick={close}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={invest}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Confirm Investment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupInvest;

