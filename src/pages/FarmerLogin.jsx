import React from "react";

export default function FarmerLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Farmer Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
