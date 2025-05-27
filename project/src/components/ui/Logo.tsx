import React from 'react';
import { Sprout } from 'lucide-react';

const Logo: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-10 w-10',
  };

  return (
    <div className={`bg-primary-600 rounded-md text-white flex items-center justify-center ${sizeClasses[size]}`}>
      <Sprout size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />
    </div>
  );
};

export default Logo;