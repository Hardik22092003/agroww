export default function WalletBalance() {
  const balance = 15200;
  const recentActivity = [
    { id: 1, type: "Investment", amount: 3000, date: "2025-05-27" },
    { id: 2, type: "Deposit", amount: 5000, date: "2025-05-26" },
    { id: 3, type: "Profit", amount: 1200, date: "2025-05-25" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Wallet Balance</h1>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Current Balance</h2>
        <p className="text-3xl text-green-600 font-bold">₹{balance}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Activity
        </h2>
        <ul className="space-y-2">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded-md hover:bg-green-50 flex justify-between"
            >
              <span>
                {item.date} - {item.type}
              </span>
              <span className="font-semibold">₹{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
