import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PlusCircle, 
  AlertCircle, 
  Sprout 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import InvestmentSummary from './InvestmentSummary';
import PortfolioChart from './PortfolioChart';
import ActiveInvestments from './ActiveInvestments';
import RecentTransactions from './RecentTransactions';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Here's what's happening with your investments today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/stocks">
            <Button
              variant="primary"
              leftIcon={<PlusCircle size={16} />}
            >
              New Investment
            </Button>
          </Link>
        </div>
      </div>

      {/* Investment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InvestmentSummary 
          title="Total Invested"
          value="₹2,45,000"
          change="+12.5%"
          isPositive={true}
          icon={<DollarSign size={24} />}
          color="primary"
        />
        <InvestmentSummary 
          title="Active Investments"
          value="8"
          change="+2"
          isPositive={true}
          icon={<Sprout size={24} />}
          color="success"
        />
        <InvestmentSummary 
          title="Total Returns"
          value="₹32,450"
          change="+8.3%"
          isPositive={true}
          icon={<TrendingUp size={24} />}
          color="secondary"
        />
        <InvestmentSummary 
          title="Upcoming Harvest"
          value="2"
          change="in 15 days"
          isPositive={false}
          showChangeAsText={true}
          icon={<AlertCircle size={24} />}
          color="warning"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Investment Growth</h2>
              <div className="flex items-center space-x-2">
                <button className="text-xs font-medium text-gray-500 px-2 py-1 rounded hover:bg-gray-100">1W</button>
                <button className="text-xs font-medium text-primary-600 px-2 py-1 bg-primary-50 rounded">1M</button>
                <button className="text-xs font-medium text-gray-500 px-2 py-1 rounded hover:bg-gray-100">3M</button>
                <button className="text-xs font-medium text-gray-500 px-2 py-1 rounded hover:bg-gray-100">1Y</button>
                <button className="text-xs font-medium text-gray-500 px-2 py-1 rounded hover:bg-gray-100">All</button>
              </div>
            </div>
            <PortfolioChart />
          </div>

          {/* Active Investments */}
          <ActiveInvestments />
        </div>

        <div className="space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link to="/transactions" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <RecentTransactions />
          </div>

          {/* Recommended Investments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
              <Link to="/stocks" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Organic Mango Farm",
                  location: "Maharashtra",
                  roi: "12.5%",
                  image: "https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  id: 2,
                  name: "Rice Cultivation Project",
                  location: "Punjab",
                  roi: "10.2%",
                  image: "https://images.pexels.com/photos/3358070/pexels-photo-3358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((investment) => (
                <Link key={investment.id} to={`/stocks/${investment.id}`}>
                  <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src={investment.image} 
                      alt={investment.name} 
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{investment.name}</h3>
                      <p className="text-xs text-gray-500">{investment.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary-600">{investment.roi}</span>
                      <p className="text-xs text-gray-500">Expected ROI</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to="/stocks">
                <Button variant="outline" fullWidth>
                  Explore More Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;