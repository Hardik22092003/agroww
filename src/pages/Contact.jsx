import React from "react";

const Contact = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-emerald-700">Contact Us</h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions or want to get involved with Agroww? Reach out to us!
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-16 text-center text-gray-600">
          <p>Email: <a href="mailto:support@agroww.com" className="text-emerald-600 hover:underline">support@agroww.com</a></p>
          <p>Phone: <span className="text-emerald-600">+91-XXXXXXXXXX</span></p>
          <p>Address: Agroww HQ, Bhopal, India</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
