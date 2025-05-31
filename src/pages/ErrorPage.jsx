import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Unauthorized() {
  const location = useLocation();
  const from = location.state?.from || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="flex flex-col gap-4">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Go to Home
          </Link>
          <Link to="/" className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
            Login with different account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;