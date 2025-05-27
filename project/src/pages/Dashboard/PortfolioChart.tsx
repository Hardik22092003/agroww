import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 150000 },
  { name: 'Feb', value: 160000 },
  { name: 'Mar', value: 175000 },
  { name: 'Apr', value: 180000 },
  { name: 'May', value: 195000 },
  { name: 'Jun', value: 210000 },
  { name: 'Jul', value: 225000 },
  { name: 'Aug', value: 245000 },
];

const formatValue = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}k`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-primary-600 font-semibold">{formatValue(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const PortfolioChart: React.FC = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#0D9488" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;