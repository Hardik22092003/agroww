import React from 'react';
import { Link } from 'react-router-dom';

interface Investment {
  id: number;
  name: string;
  location: string;
  progress: number;
  expectedHarvest: string;
  amount: string;
  expectedReturn: string;
  image: string;
  category: string;
}

const ActiveInvestments: React.FC = () => {
  const investments: Investment[] = [
    {
      id: 1,
      name: "Organic Mango Farm",
      location: "Maharashtra, India",
      progress: 65,
      expectedHarvest: "May 15, 2025",
      amount: "₹75,000",
      expectedReturn: "₹84,375 (+12.5%)",
      image: "https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Rice Cultivation Project",
      location: "Punjab, India",
      progress: 40,
      expectedHarvest: "July 30, 2025",
      amount: "₹50,000",
      expectedReturn: "₹55,100 (+10.2%)",
      image: "https://images.pexels.com/photos/3358070/pexels-photo-3358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Grains"
    },
    {
      id: 3,
      name: "Apple Orchard Expansion",
      location: "Himachal Pradesh, India",
      progress: 25,
      expectedHarvest: "October 10, 2025",
      amount: "₹100,000",
      expectedReturn: "₹114,800 (+14.8%)",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Fruits"
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Active Investments</h2>
        <Link to="/investments" className="text-sm font-medium text-primary-600 hover:text-primary-700">
          View all
        </Link>
      </div>
      
      <div className="space-y-6">
        {investments.map((investment) => (
          <div key={investment.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img 
                  src={investment.image} 
                  alt={investment.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded">
                        {investment.category}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {investment.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{investment.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Expected harvest: {investment.expectedHarvest}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-gray-500">Invested</p>
                    <p className="text-lg font-semibold text-gray-900">{investment.amount}</p>
                    <p className="text-sm text-success-700">{investment.expectedReturn}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Growth Progress</span>
                    <span>{investment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${investment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Link
                    to={`/stocks/${investment.id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveInvestments;