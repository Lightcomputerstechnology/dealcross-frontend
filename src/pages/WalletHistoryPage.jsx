// File: src/pages/WalletHistoryPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';

export default function WalletHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/wallet/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data || []);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to fetch transactions.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getIcon = (type) => {
    if (!type) return null;
    const t = type.toLowerCase();
    if (t.includes('deposit') || t.includes('fund')) {
      return <FaArrowDown className="text-green-400 inline mr-2" />;
    } else if (t.includes('withdraw')) {
      return <FaArrowUp className="text-red-400 inline mr-2" />;
    } else {
      return <FaExchangeAlt className="text-yellow-400 inline mr-2" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Wallet History - Dealcross</title>
        <meta name="description" content="Review all your wallet transactions on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center">Wallet History</h1>

          {loading ? (
            <p className="text-yellow-400 text-center">Loading transactions...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-400 text-center">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto border border-gray-700 rounded-lg shadow-md">
              <table className="min-w-full bg-[#1e293b] text-sm">
                <thead className="text-gray-400 bg-gray-800 uppercase text-xs border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                      <td className="px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2 capitalize flex items-center">
                        {getIcon(tx.type)}
                        {tx.type}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-green-300">
                        ₦{Number(tx.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tx.status === 'completed'
                              ? 'bg-green-600 text-white'
                              : tx.status === 'pending'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}