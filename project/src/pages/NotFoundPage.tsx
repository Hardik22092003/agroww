import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <Sprout size={64} className="mx-auto text-primary-600 mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;