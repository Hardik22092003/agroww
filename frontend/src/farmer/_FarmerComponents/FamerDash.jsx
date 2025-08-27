
function FamerDash (){
    return(
        <div>
        <div className="max-w-3xl mx-auto p-6" id="famerAccess">
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Farmer Dashboard</h2>
      <p className="text-gray-600 mb-6">
        This dashboard provides you with insights into your contracts, farming activities, and tools to manage your projects efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-500">3</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Total Investors</h3>
          <p className="text-3xl font-bold text-blue-500">12</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex justify-between text-sm">
            <span>New contract proposal created</span>
            <span className="text-gray-500">2 hours ago</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Investor John Doe requested access</span>
            <span className="text-gray-500">5 hours ago</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Contract #123 approved</span>
            <span className="text-gray-500">Yesterday</span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
          <p className="text-gray-600 text-sm">Performance charts and analytics will be displayed here.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Announcements</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>New features launching next week.</li>
            <li>System maintenance scheduled for Saturday.</li>
            <li>Remember to update your contract details.</li>
          </ul>
        </div>
      </div>
    </div>



    </div>
    )
}

export default FamerDash
