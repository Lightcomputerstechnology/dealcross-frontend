// File: src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Processing...');

    try {
      const response = await axios.post('https://d-final.onrender.com/auth/forgot-password', { email });
      if (response.status === 200) {
        setStatus('Password reset link sent! Check your email.');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus(error.response?.data?.detail || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      <Helmet>
        <title>Forgot Password - Dealcross</title>
        <meta name="description" content="Reset your password by email if you’ve forgotten it." />
        <meta name="keywords" content="forgot password, reset, email, dealcross" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Reset Your Password - Dealcross" />
        <meta property="og:description" content="Forgot your password? Request a reset link from Dealcross." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/forgot-password" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Forgot Password - Dealcross" />
        <meta name="twitter:description" content="Reset your account securely through email." />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border dark:border-gray-700"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Forgot Password</h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Enter your email address and we’ll send you a password reset link.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {!isEmailValid(email) && email.length > 3 && (
            <p className="text-sm text-red-400 text-center">Please enter a valid email address.</p>
          )}

          <button
            type="submit"
            disabled={!isEmailValid(email) || loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {status && <p className="text-sm text-yellow-400 text-center">{status}</p>}

          <div className="text-center text-sm mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </motion.form>
      </main>
    </>
  );
}