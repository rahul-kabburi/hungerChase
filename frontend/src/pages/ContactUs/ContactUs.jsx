import React from "react";

const ContactUs = () => {
  return (
    <div className="py-10 px-4 md:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Contact Us
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
