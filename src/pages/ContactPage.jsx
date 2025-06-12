// File: src/pages/ContactPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiMail, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post('https://d-final.onrender.com/contact/send-email', formData);
      setStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ success: false, message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Dealcross</title>
        <meta name="description" content="Reach out to the Dealcross team for support or partnerships." />
        <meta name="keywords" content="contact dealcross, support, help, message, email" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Contact Dealcross Support" />
        <meta property="og:description" content="Need help or have a question? Contact the Dealcross team today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Dealcross" />
        <meta name="twitter:description" content="We’re here to help! Reach out to our team anytime." />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400 text-center">
          Have questions or feedback? We'd love to hear from you.
        </p>

        {status && (
          <div
            className={`mb-4 text-center px-4 py-2 rounded ${
              status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FiMail className="text-lg" />
            <span>Email: support@dealcross.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-lg" />
            <span>Office Hours: Monday – Friday, 9AM – 6PM</span>
          </div>
        </div>
      </section>
    </>
  );
}