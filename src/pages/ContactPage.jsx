// File: src/pages/ContactPage.jsx

import React from 'react'; import { Helmet } from 'react-helmet'; import { FiMail, FiClock } from 'react-icons/fi';

export default function ContactPage() { return ( <> <Helmet> <title>Contact Us - Dealcross</title> <meta name="description" content="Reach out to the Dealcross team for help, support, or partnership opportunities." /> <meta name="keywords" content="contact dealcross, support, help, message, email" /> <meta name="author" content="Dealcross Team" /> <meta property="og:title" content="Contact Dealcross Support" /> <meta property="og:description" content="Need help or have a question? Contact the Dealcross team today." /> <meta property="og:type" content="website" /> <meta property="og:url" content="https://dealcross.com/contact" /> <meta name="twitter:card" content="summary" /> <meta name="twitter:title" content="Contact Dealcross" /> <meta name="twitter:description" content="We’re here to help! Reach out to our team for any support or partnership inquiry." /> </Helmet>

<main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400 text-center">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows="5"
            placeholder="Type your message here..."
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center space-y-2">
        <p className="flex justify-center items-center gap-2">
          <FiMail /> Email: support@dealcross.com
        </p>
        <p className="flex justify-center items-center gap-2">
          <FiClock /> Office Hours: Monday – Friday, 9AM – 6PM
        </p>
      </div>
    </div>
  </main>
</>

); }