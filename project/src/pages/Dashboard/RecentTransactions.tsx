import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'investment' | 'return' | 'withdrawal' | 'deposit';
  description: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'investment',
      description: 'Investment in Apple Orchard',
      amount: '₹100,000',
      date: 'Apr 15, 2025',
      status: 'completed'
    },
    {
      id: 2,
      type: 'deposit',
      description: 'Deposit to Agroww Wallet',
      amount: '₹150,000',
      date: 'Apr 10, 2025',
      status: 'completed'
    },
    {
      id: 3,
      type: 'return',
      description: 'Return from Wheat Farm',
      amount: '₹56,250',
      date: 'Mar 28, 2025',
      status: 'completed'
    },
    {
      id: 4,
      type: 'withdrawal',
      description: 'Withdrawal to HDFC Bank',
      amount: '₹25,000',
      date: 'Mar 15, 2025',
      status: 'completed'
    }
  ];
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-700 bg-success-50';
      case 'pending':
        return 'text-warning-700 bg-warning-50';
      case 'failed':
        return 'text-error-700 bg-error-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'investment':
      case 'withdrawal':
        return <ArrowUpRight size={16} className="text-error-500" />;
      case 'return':
      case 'deposit':
        return <ArrowDownRight size={16} className="text-success-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              {getTypeIcon(transaction.type)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${transaction.type === 'investment' || transaction.type === 'withdrawal' ? 'text-gray-900' : 'text-success-700'}`}>
              {transaction.amount}
            </p>
            <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${getStatusClass(transaction.status)}`}>
              {transaction.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;