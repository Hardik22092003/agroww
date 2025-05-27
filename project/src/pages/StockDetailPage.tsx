import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  User, 
  BarChart2, 
  ImageIcon, 
  Leaf, 
  Truck, 
  Sprout 
} from 'lucide-react';
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
  gallery: string[];
  farmer: {
    name: string;
    image: string;
    experience: string;
  };
  longDescription: string;
  category: string;
  harvestDate: string;
  minimumInvestment: string;
  cropDetails: string;
  impact: string;
}

const farmStocks: FarmStock[] = [
  {
    id: 1,
    name: "Organic Mango Farm",
    location: "Maharashtra, India",
    description: "Invest in a certified organic mango farm with export-quality produce and established market connections.",
    longDescription: "This 10-acre mango farm is located in the fertile region of Ratnagiri, Maharashtra, known for producing the famous Alphonso mangoes. The farm uses organic farming methods and has been certified organic for the past 5 years. The farmer has established export connections in the Middle East and Europe, ensuring premium prices for the produce. The farm has a consistent yield history and uses sustainable water management practices.",
    roi: "12.5%",
    duration: "8 months",
    raised: 75,
    goal: "₹10,00,000",
    risklevel: "Low",
    image: "https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gallery: [
      "https://images.pexels.com/photos/5677011/pexels-photo-5677011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/134877/pexels-photo-134877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5473045/pexels-photo-5473045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Fruits",
    harvestDate: "February 2026",
    minimumInvestment: "₹10,000",
    cropDetails: "Alphonso mango variety, known for its sweetness and aroma. Each tree produces approximately 40-60 kg of fruit per season. The farm has 500 mature mango trees.",
    impact: "This project supports organic farming practices and helps local farmers receive fair prices for their produce. It also preserves traditional farming knowledge and promotes sustainable agriculture.",
    farmer: {
      name: "Rajesh Patil",
      image: "https://images.pexels.com/photos/2382695/pexels-photo-2382695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      experience: "15+ years in mango cultivation"
    }
  },
  {
    id: 2,
    name: "Rice Cultivation Project",
    location: "Punjab, India",
    description: "Fund a sustainable rice cultivation project using modern farming techniques and drought-resistant varieties.",
    longDescription: "This 25-acre rice farm is located in the fertile plains of Punjab, India's breadbasket. The project focuses on cultivating high-yield, drought-resistant rice varieties using modern farming techniques that reduce water usage by up to 30% compared to traditional methods. The farm implements integrated pest management to minimize chemical usage while maintaining crop health. The farmer has established relationships with major food processing companies, ensuring stable market access and fair prices.",
    roi: "10.2%",
    duration: "6 months",
    raised: 85,
    goal: "₹15,00,000",
    risklevel: "Low",
    image: "https://images.pexels.com/photos/3358070/pexels-photo-3358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gallery: [
      "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/17441746/pexels-photo-17441746/free-photo-of-rice-paddy-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5677800/pexels-photo-5677800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Grains",
    harvestDate: "November 2025",
    minimumInvestment: "₹15,000",
    cropDetails: "Basmati rice variety PR-126, which requires less water and has a shorter maturation period. Expected yield is 6-7 tons per hectare.",
    impact: "This project promotes water conservation in agriculture and supports food security. It demonstrates sustainable farming practices that can be replicated in other regions facing water scarcity.",
    farmer: {
      name: "Gurpreet Singh",
      image: "https://images.pexels.com/photos/7276810/pexels-photo-7276810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      experience: "12+ years in rice cultivation"
    }
  }
];

const StockDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [farmStock, setFarmStock] = useState<FarmStock | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'farmer' | 'updates'>('overview');
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showInvestmentForm, setShowInvestmentForm] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      const stock = farmStocks.find(stock => stock.id === parseInt(id));
      if (stock) {
        setFarmStock(stock);
        setInvestmentAmount(stock.minimumInvestment.replace('₹', '').replace(',', ''));
      }
    }
  }, [id]);
  
  if (!farmStock) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading farm details...</p>
      </div>
    );
  }
  
  const handleInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the investment transaction
    alert(`Investment of ₹${investmentAmount} submitted for ${farmStock.name}`);
    setShowInvestmentForm(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/stocks" className="hover:text-primary-600">Farm Investments</Link>
        <span>/</span>
        <span className="text-gray-900">{farmStock.name}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-80 relative">
          <img 
            src={farmStock.image} 
            alt={farmStock.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary-600 bg-opacity-80 rounded">
                {farmStock.category}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                farmStock.risklevel === 'Low' ? 'bg-green-600 bg-opacity-80' :
                farmStock.risklevel === 'Medium' ? 'bg-yellow-600 bg-opacity-80' :
                'bg-red-600 bg-opacity-80'
              }`}>
                {farmStock.risklevel} Risk
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{farmStock.name}</h1>
            <div className="flex items-center text-white/80">
              <MapPin size={16} className="mr-1" />
              <span>{farmStock.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'overview' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'details' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Farm Details
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'farmer' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('farmer')}
          >
            Farmer
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'updates' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('updates')}
          >
            Updates
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">About This Farm</h2>
                  <p className="text-gray-700 mb-4">{farmStock.longDescription}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <TrendingUp size={16} className="mr-2" />
                        <span className="text-xs">Expected ROI</span>
                      </div>
                      <p className="text-lg font-semibold text-primary-600">{farmStock.roi}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-xs">Duration</span>
                      </div>
                      <p className="text-lg font-semibold">{farmStock.duration}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-xs">Harvest Date</span>
                      </div>
                      <p className="text-lg font-semibold">{farmStock.harvestDate}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <AlertTriangle size={16} className="mr-2" />
                        <span className="text-xs">Risk Level</span>
                      </div>
                      <p className={`text-lg font-semibold ${
                        farmStock.risklevel === 'Low' ? 'text-success-700' :
                        farmStock.risklevel === 'Medium' ? 'text-warning-700' :
                        'text-error-700'
                      }`}>
                        {farmStock.risklevel}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Farm Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {farmStock.gallery.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${farmStock.name} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Impact</h2>
                  <div className="bg-primary-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <Leaf size={24} className="text-primary-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainability Impact</h3>
                        <p className="text-gray-700">{farmStock.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fundraising Goal</span>
                      <span>{farmStock.raised}% Completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${farmStock.raised}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Raised: ₹{(parseInt(farmStock.goal.replace(/[^\d]/g, '')) * farmStock.raised / 100).toLocaleString('en-IN')}</span>
                      <span>Goal: {farmStock.goal}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Minimum Investment</span>
                      <span className="font-medium">{farmStock.minimumInvestment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected ROI</span>
                      <span className="font-medium text-primary-600">{farmStock.roi}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{farmStock.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Harvest Date</span>
                      <span className="font-medium">{farmStock.harvestDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {showInvestmentForm ? (
                      <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Investment Amount (₹)
                          </label>
                          <input
                            type="number"
                            className="input w-full"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            min={parseInt(farmStock.minimumInvestment.replace(/[^\d]/g, ''))}
                            step="1000"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum investment: {farmStock.minimumInvestment}
                          </p>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button variant="primary" type="submit" fullWidth>
                            Confirm Investment
                          </Button>
                          <Button 
                            variant="outline" 
                            type="button" 
                            onClick={() => setShowInvestmentForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <Button 
                        variant="primary" 
                        fullWidth 
                        leftIcon={<Sprout size={16} />}
                        onClick={() => setShowInvestmentForm(true)}
                      >
                        Invest Now
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center">
                    <img 
                      src={farmStock.farmer.image} 
                      alt={farmStock.farmer.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{farmStock.farmer.name}</h3>
                      <p className="text-gray-600 text-sm">{farmStock.farmer.experience}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-primary-600 text-sm font-medium hover:text-primary-700" onClick={() => setActiveTab('farmer')}>
                      View farmer profile →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Crop Details</h2>
                <p className="text-gray-700">{farmStock.cropDetails}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start">
                    <ImageIcon size={24} className="text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Land Information</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Total land area dedicated to this project</li>
                        <li>• Soil type and quality assessment</li>
                        <li>• Water source and irrigation system details</li>
                        <li>• Land ownership and lease information</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start">
                    <Leaf size={24} className="text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Farming Practices</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Sustainable farming methods employed</li>
                        <li>• Organic certification status</li>
                        <li>• Pest management approach</li>
                        <li>• Use of technology in farm management</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start">
                    <BarChart2 size={24} className="text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Yield History</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Previous harvest data and performance</li>
                        <li>• Historical yield patterns</li>
                        <li>• Factors affecting yield variations</li>
                        <li>• Expected yield for current season</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start">
                    <Truck size={24} className="text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Market Access</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Established buyer relationships</li>
                        <li>• Market channels and distribution network</li>
                        <li>• Price trends for the crop</li>
                        <li>• Export potential and certifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Climate Risk</h3>
                      <p className="text-gray-700">Assessment of weather patterns and climate risks in the region, including drought, flood, or extreme temperature risks. Mitigation measures in place.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Market Risk</h3>
                      <p className="text-gray-700">Analysis of market volatility, price fluctuations, and demand patterns. Details of contracts or arrangements to secure favorable prices.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Operational Risk</h3>
                      <p className="text-gray-700">Evaluation of operational challenges, labor availability, and machinery reliability. Contingency plans for operational disruptions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'farmer' && (
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <img 
                  src={farmStock.farmer.image} 
                  alt={farmStock.farmer.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold mb-1">{farmStock.farmer.name}</h2>
                  <p className="text-gray-600">{farmStock.farmer.experience}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Farmer Biography</h3>
                <p className="text-gray-700">
                  {farmStock.farmer.name} comes from a family with a long tradition of farming. With {farmStock.farmer.experience} specifically in {farmStock.category.toLowerCase()} cultivation, he has developed deep expertise in sustainable farming practices. 
                  He has consistently achieved above-average yields through careful land management and innovative techniques.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Farming Experience</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-600 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Specialized in {farmStock.category} Farming</p>
                        <p className="text-gray-600 text-sm">Over a decade of experience in {farmStock.category.toLowerCase()} cultivation</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-600 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Advanced Agricultural Training</p>
                        <p className="text-gray-600 text-sm">Completed certification in modern farming techniques</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-600 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Sustainable Farming Advocate</p>
                        <p className="text-gray-600 text-sm">Implemented water conservation and organic practices</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Track Record</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Consistent Yield Performance</p>
                        <p className="text-gray-600 text-sm">15% above regional average for the past 3 years</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Quality Recognition</p>
                        <p className="text-gray-600 text-sm">Received local awards for produce quality</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Previous Project Success</p>
                        <p className="text-gray-600 text-sm">Successfully completed 2 previous funded projects</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Partner Farmers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">Local Farmer #{index}</p>
                        <p className="text-gray-600 text-xs">Supporting role</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'updates' && (
            <div className="space-y-8">
              <div className="text-center py-8">
                <Sprout size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No updates yet</h3>
                <p className="text-gray-600">Updates will appear here once the project starts</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;