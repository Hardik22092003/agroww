import { useEffect,useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Some from "./Some";
function GetAllContracts() {
    let [contracts,setContracts]=useState([]);
  
   
    useEffect(()=>{
        axios.get(`https://agroww.onrender.com/farmer/${localStorage.getItem("username")}/allcontracts`).then((res)=>{
                console.log(res.data);
                setContracts(res.data);
            }).catch((err)=>{
                console.log(err);

            })

    },[])
    return ( <div>
      <hr className="mb-3"></hr>
        <div className=" flex flex-wrap gap-6 ml-0 pl-4 w-full text-start">
            <ToastContainer />
            {contracts.length === 0 ?<Some/>:
          contracts.map((land) => (
            <div key={land.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={"/land4.jpg"} alt={"img "} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800">{land.contractName}</h2>
                <p className="text-gray-600">Crop: <span className="font-medium">{land.totalLandSize}</span></p>
                <p className="text-gray-600">Risk: <span className="text-yellow-700 font-semibold">{land.expectedROI}%</span></p>
                <p className="text-gray-600">Duration: {36}</p>
                <div className="flex justify-between">
                <p className="text-gray-600">Units Available: {land.unitsLeft}</p>
                <p className="text-gray-600">Units Sold: {land.unitsSold}</p>
                </div>
                <p className="text-green-700 font-bold mt-2">₹{land.unitPrice} / unit</p>
                <p className="text-sm mt-2 text-gray-500">{
                    "it is a xyz Land"}</p>
                    <div className="flex">
                <button className="mt-4 bg-green-600  hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                  Update
                </button>
                <button className="mt-4  hover:bg-red-700 hover:text-white text-red-700 px-4 py-2 rounded w-full">
                    Delete Contract
                </button >
                </div>
              </div>
            </div>
          ))
        }
        </div>
    </div> );
}

export default GetAllContracts;