import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface InvestmentSummaryProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showChangeAsText?: boolean;
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  color,
  showChangeAsText = false
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      icon: 'text-primary-600'
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      icon: 'text-secondary-600'
    },
    success: {
      bg: 'bg-success-50',
      text: 'text-success-700',
      icon: 'text-success-500'
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-700',
      icon: 'text-warning-500'
    },
    error: {
      bg: 'bg-error-50',
      text: 'text-error-700',
      icon: 'text-error-500'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className={`${colorClasses[color].bg} p-3 rounded-lg`}>
          <div className={colorClasses[color].icon}>{icon}</div>
        </div>
        {!showChangeAsText && (
          <div className={`flex items-center ${isPositive ? 'text-success-700' : 'text-error-700'}`}>
            {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {showChangeAsText && (
          <p className="text-sm text-gray-500 mt-1">{change}</p>
        )}
      </div>
    </div>
  );
};

export default InvestmentSummary;