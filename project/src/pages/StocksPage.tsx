import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Sprout } from 'lucide-react';
import Button from '../components/ui/Button';

interface FarmStock {
  id: number;
  name: string;
  location: string;
  description: string;
  roi: string;
  duration: string;
  raised: number;
  goal: string;
  risklevel: 'Low' | 'Medium' | 'High';
  image: string;
  category: string;
}

const StocksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRisk, setSelectedRisk] = useState<string>('');
  
  const farmStocks: FarmStock[] = [
    {
      id: 1,
      name: "Organic Mango Farm",
      location: "Maharashtra, India",
      description: "Invest in a certified organic mango farm with export-quality produce and established market connections.",
      roi: "12.5%",
      duration: "8 months",
      raised: 75,
      goal: "₹10,00,000",
      risklevel: "Low",
      image: "https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Rice Cultivation Project",
      location: "Punjab, India",
      description: "Fund a sustainable rice cultivation project using modern farming techniques and drought-resistant varieties.",
      roi: "10.2%",
      duration: "6 months",
      raised: 85,
      goal: "₹15,00,000",
      risklevel: "Low",
      image: "https://images.pexels.com/photos/3358070/pexels-photo-3358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Grains"
    },
    {
      id: 3,
      name: "Apple Orchard Expansion",
      location: "Himachal Pradesh, India",
      description: "Support the expansion of a successful apple orchard with proven yield history and strong market demand.",
      roi: "14.8%",
      duration: "12 months",
      raised: 60,
      goal: "₹20,00,000",
      risklevel: "Medium",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Fruits"
    },
    {
      id: 4,
      name: "Organic Vegetable Farm",
      location: "Karnataka, India",
      description: "Invest in a diverse organic vegetable farm serving premium markets and export channels.",
      roi: "11.5%",
      duration: "4 months",
      raised: 45,
      goal: "₹8,00,000",
      risklevel: "Low",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Vegetables"
    },
    {
      id: 5,
      name: "Saffron Cultivation",
      location: "Jammu & Kashmir, India",
      description: "Be part of a high-value saffron cultivation project with traditional farming expertise and premium market access.",
      roi: "18.0%",
      duration: "10 months",
      raised: 30,
      goal: "₹25,00,000",
      risklevel: "High",
      image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Spices"
    },
    {
      id: 6,
      name: "Turmeric Farming Project",
      location: "Tamil Nadu, India",
      description: "Support organic turmeric cultivation with advanced processing facilities and export connections.",
      roi: "13.5%",
      duration: "9 months",
      raised: 55,
      goal: "₹12,00,000",
      risklevel: "Medium",
      image: "https://images.pexels.com/photos/4198190/pexels-photo-4198190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Spices"
    }
  ];
  
  const categories = [...new Set(farmStocks.map(stock => stock.category))];
  const locations = [...new Set(farmStocks.map(stock => stock.location))];
  const riskLevels = [...new Set(farmStocks.map(stock => stock.risklevel))];
  
  const filteredStocks = farmStocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          stock.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? stock.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? stock.location === selectedLocation : true;
    const matchesRisk = selectedRisk ? stock.risklevel === selectedRisk : true;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesRisk;
  });
  
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedRisk('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Investments</h1>
          <p className="text-gray-600">Discover and invest in agricultural projects across India</p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search farms, crops, locations..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              leftIcon={<ArrowUpDown size={16} />}
            >
              Sort
            </Button>
          </div>
        </div>
        
        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="input w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                className="input w-full"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <select
                className="input w-full"
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
              >
                <option value="">All Risk Levels</option>
                {riskLevels.map((risk) => (
                  <option key={risk} value={risk}>{risk}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Farm Stocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <div key={stock.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all card-hover">
              <img 
                src={stock.image} 
                alt={stock.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded">
                    {stock.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    stock.risklevel === 'Low' ? 'bg-success-50 text-success-700' :
                    stock.risklevel === 'Medium' ? 'bg-warning-50 text-warning-700' :
                    'bg-error-50 text-error-700'
                  }`}>
                    {stock.risklevel} Risk
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{stock.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{stock.location}</p>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{stock.description}</p>
                
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Expected ROI</p>
                    <p className="text-primary-600 font-semibold">{stock.roi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{stock.duration}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stock.raised}% Raised</span>
                    <span>of {stock.goal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${stock.raised}%` }}
                    ></div>
                  </div>
                </div>
                
                <Link to={`/stocks/${stock.id}`}>
                  <Button variant="primary" fullWidth leftIcon={<Sprout size={16} />}>
                    Invest Now
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center">
            <Sprout size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No farms found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StocksPage;