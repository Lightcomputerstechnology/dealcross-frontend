import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const StartDealPairing = () => {
  useAuthRedirect(); // Ensure user is logged in

  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handlePairing = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Login required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://d-final.onrender.com/deals/pair',
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.status === 'waiting') {
        toast.success('Pairing request sent. Awaiting confirmation.');
        setConfirmed(true);
      } else {
        toast.error(response.data?.detail || 'Unexpected response.');
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Pairing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pair a Deal - Dealcross</title>
        <meta name="description" content="Pair your deal with a buyer or seller by entering their email or user ID." />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Pair with a Buyer or Seller</h2>

          {!confirmed ? (
            <form onSubmit={handlePairing} className="space-y-5">
              <div>
                <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Enter Counterparty Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded font-semibold transition ${
                  loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {loading ? 'Sending...' : 'Send Pairing Request'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-400 font-medium">Pairing request sent to:</p>
              <p className="text-lg font-bold text-blue-400">{email}</p>
              <p className="text-sm text-gray-400">Waiting for counterparty to confirm.</p>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default StartDealPairing;