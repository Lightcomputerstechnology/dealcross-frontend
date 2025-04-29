// File: src/components/ContactSection.jsx

import React, { useState } from 'react';
import API from '@/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await API.post('/support/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status && (
            <p className="mt-3 text-sm text-center text-green-600 dark:text-green-400">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;