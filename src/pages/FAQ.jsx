import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Agroww?",
      answer:
        "Agroww is a tech-driven platform that allows farmers to upload and list their agricultural land as shareable assets. Investors can purchase shares in this land and gain returns through crop yields or value appreciation, similar to stock market investments.",
    },
    {
      question: "How does land share trading work?",
      answer:
        "Farmers can divide their land into shares and list them on our platform. Verified investors can buy these shares, gaining a stake in the land’s productivity. Earnings from crop sales or land value changes are distributed based on share ownership.",
    },
    {
      question: "How do you ensure trust and security?",
      answer:
        "Each listing is verified by our admin team to ensure legitimacy. We use secure payment gateways and digital agreements to protect both farmers and investors, ensuring transparency and trust at every step.",
    },
    {
      question: "What kind of land can be listed on Agroww?",
      answer:
        "Currently, Agroww supports agricultural lands suitable for crop production. Farmers must provide land ownership documents and necessary verification details during the onboarding process.",
    },
    {
      question: "What do investors gain from Agroww?",
      answer:
        "Investors gain access to a new class of sustainable investments. They can track land performance, get returns from agricultural yields, and contribute to food security and green growth.",
    },
    {
      question: "Who can become an investor?",
      answer:
        "Anyone above 18 with a verified identity and valid payment method can become an investor. Whether you're an individual, a company, or an institution—Agroww enables smart investment in agriculture.",
    },
    {
      question: "Is there a minimum investment amount?",
      answer:
        "Yes, each land listing may have its own minimum share price set by the farmer. You can start small or scale based on your interest and risk appetite.",
    },
    {
      question: "How is farmer income calculated?",
      answer:
        "Farmer income is calculated based on the remaining share ownership after investor purchases. They also receive proceeds from their portion of the harvest or land value appreciation.",
    },
    {
      question: "Can I resell my land shares?",
      answer:
        "Yes, Agroww is working on a secure secondary marketplace that allows verified investors to resell their shares to other interested users.",
    },
    {
      question: "How do I get started as a farmer or investor?",
      answer:
        "Simply register on Agroww, choose your role (Farmer or Investor), and follow the onboarding steps. Our support team is available to guide you through the process.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-8 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">{faq.question}</h3>
            <p className="text-gray-700 text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
