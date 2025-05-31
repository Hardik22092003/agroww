import React from "react";

const HelpDesk = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Help Desk</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🔧 Having trouble?</h2>
        <p className="text-gray-700">
          If you’re experiencing issues with registration, investment, crop updates, or any other feature, our team is here to help!
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📞 Contact Support</h2>
        <ul className="text-gray-700 list-disc list-inside">
          <li>Email: support@agroww.in</li>
          <li>Phone: +91-99999-99999</li>
          <li>Live Chat: Available 9AM - 6PM (IST)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📚 Resources</h2>
        <ul className="text-blue-600 underline list-disc list-inside">
          <li><a href="/faq">Visit our FAQ</a></li>
          <li><a href="/contact">Contact Form</a></li>
          <li><a href="/about">About the Agroww team</a></li>
        </ul>
      </div>
    </div>
  );
};

export default HelpDesk;
