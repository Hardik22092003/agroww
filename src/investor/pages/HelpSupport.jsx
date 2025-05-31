import React from "react";
import { toast,ToastContainer } from "react-toastify";

export default function HelpSupport() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-green-700 mb-4">Help & Support</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <p>
          If you need assistance, feel free to reach out to us through the
          following channels:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            Email:{" "}
            <a
              href="mailto:support@agriplatform.com"
              className="text-green-600"
            >
              support@agriplatform.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+918000000000" className="text-green-600">
              +91 80000 00000
            </a>
          </li>
          <li>Live Chat: Available 9AM - 6PM IST</li>
        </ul>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Submit a Request
          </label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Describe your issue or query..."
            rows={5}
          ></textarea>
          <button onClick={()=>{
            toast.success("Your request has been submitted successfully!");
          }} className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
