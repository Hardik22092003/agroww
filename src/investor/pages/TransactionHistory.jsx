// src/investor/pages/TransactionHistory.jsx
import React from "react";

export default function TransactionHistory() {
  const transactions = [
    { id: 1, date: "2025-05-01", type: "Invested", amount: 5000 },
    { id: 2, date: "2025-05-15", type: "Profit", amount: 600 },
    { id: 3, date: "2025-06-01", type: "Invested", amount: 4500 },
  ];

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
    </div>
  );
}
