import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does investing in agriculture work?",
      answer: "When you invest through Agroww, you're providing capital to farmers for their agricultural projects. Based on the project's yield and success, you receive returns on your investment after the crop cycle is complete. We carefully vet each farming project to ensure they meet our quality and sustainability standards."
    },
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment amount is ₹1,000, making agricultural investments accessible to everyone. You can choose to invest in multiple projects to diversify your portfolio across different crops, regions, and farming methods."
    },
    {
      question: "How are returns calculated and distributed?",
      answer: "Returns are calculated based on the success of the agricultural project, typically ranging from 8-15% annually. Once the crop is harvested and sold, your principal investment plus returns are credited to your Agroww account. You can then withdraw the funds to your bank account or reinvest in new opportunities."
    },
    {
      question: "What are the risks involved?",
      answer: "Agricultural investments carry risks including weather uncertainties, market price fluctuations, and crop diseases. We mitigate these risks by partnering with experienced farmers, implementing crop insurance, and diversifying across multiple projects. Each investment opportunity includes a detailed risk assessment."
    },
    {
      question: "How do you select farmers and projects?",
      answer: "We have a rigorous selection process that evaluates farmers based on their experience, track record, land quality, and farming practices. Our agricultural experts conduct site visits and technical assessments. We prioritize sustainable farming methods and transparent operations."
    },
    {
      question: "Is my investment secure?",
      answer: "We implement several security measures including formal agreements with farmers, regular monitoring of farms, crop insurance, and diversification. While all investments carry risk, we focus on creating a secure and transparent platform for agricultural investments."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about investing with Agroww
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {expandedIndex === index && (
                <div className="p-6 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;