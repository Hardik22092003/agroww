import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">About Agroww</h1>
      <p className="text-gray-700 mb-4">
        <strong>Agroww</strong> is a next-generation AgriTech platform connecting farmers and investors to transform Indian agriculture through transparency, traceability, and technology.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to empower farmers with access to capital, resources, and knowledge, while allowing investors to directly participate in India’s agricultural growth journey. We focus on:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Ensuring fair investments and returns</li>
        <li>Providing real-time crop updates and reports</li>
        <li>Supporting sustainable and transparent farming practices</li>
      </ul>
      <p className="text-gray-700">
        We are building a future where agriculture is profitable, traceable, and inclusive. Join us on this mission to bridge the rural-urban divide through innovation and trust.
      </p>
    </div>
  );
};

export default AboutUs;
