import React from 'react';

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-4 sm:ml-64">
        {/* Top Bar */}
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-between h-32 rounded bg-gray-300 dark:bg-gray-800 p-6">
              <div>
                <h3 className="text-lg font-semibold">Total Investment</h3>
                <p className="text-2xl font-bold">$50,000</p>
              </div>
              <span className="text-green-500 text-3xl">↗</span>
            </div>
            <div className="flex items-center justify-between h-32 rounded bg-gray-300 dark:bg-gray-800 p-6">
              <div>
                <h3 className="text-lg font-semibold">Active Contracts</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <span className="text-blue-500 text-3xl">📄</span>
            </div>
            <div className="flex items-center justify-between h-32 rounded bg-gray-300 dark:bg-gray-800 p-6">
              <div>
                <h3 className="text-lg font-semibold">ROI (Avg)</h3>
                <p className="text-2xl font-bold">18%</p>
              </div>
              <span className="text-yellow-500 text-3xl">💹</span>
            </div>
          </div>

          {/* Activity Feed and Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Activity Feed */}
            <div className="h-auto p-4 rounded bg-gray-300 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-3">Recent Activity</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm"><span>Invested in Contract #123</span><span className="text-gray-500">2h ago</span></li>
                <li className="flex justify-between text-sm"><span>Received payout from Contract #109</span><span className="text-gray-500">5h ago</span></li>
                <li className="flex justify-between text-sm"><span>New contract opportunity: Organic Farm A</span><span className="text-gray-500">1d ago</span></li>
                <li className="flex justify-between text-sm"><span>Updated profile information</span><span className="text-gray-500">2d ago</span></li>
              </ul>
            </div>

            {/* Suggested Contracts */}
            <div className="h-auto p-4 rounded bg-gray-300 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-3">Suggested Contracts</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-200 rounded">
                  <h5 className="font-semibold">Cocoa Expansion Project</h5>
                  <p className="text-sm text-gray-600">ROI: 22% | Duration: 12 months</p>
                </div>
                <div className="p-4 bg-gray-200 rounded">
                  <h5 className="font-semibold">Organic Rice Plantation</h5>
                  <p className="text-sm text-gray-600">ROI: 16% | Duration: 8 months</p>
                </div>
                <div className="p-4 bg-gray-200 rounded">
                  <h5 className="font-semibold">Greenhouse Vegetable Farm</h5>
                  <p className="text-sm text-gray-600">ROI: 19% | Duration: 10 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="h-auto p-4 rounded bg-gray-300 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-3">Performance Overview</h4>
              <p className="text-sm text-gray-600">Performance charts and analytics will be displayed here.</p>
            </div>
            <div className="h-auto p-4 rounded bg-gray-300 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-3">Notifications</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="p-2 bg-gray-200 rounded">Payout received from Contract #101</li>
                <li className="p-2 bg-gray-200 rounded">New high-potential contract available</li>
                <li className="p-2 bg-gray-200 rounded">Reminder: Review Contract #115 details</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} Investor Dashboard. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;
