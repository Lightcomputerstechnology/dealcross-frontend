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
    if (type.toLowerCase().includes('deposit') || type.toLowerCase().includes('fund')) {
      return <FaArrowDown className="text-green-400 inline-block mr-1" />;
    } else if (type.toLowerCase().includes('withdraw')) {
      return <FaArrowUp className="text-red-400 inline-block mr-1" />;
    } else {
      return <FaExchangeAlt className="text-yellow-400 inline-block mr-1" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Wallet History - Dealcross</title>
        <meta name="description" content="View your wallet transaction history on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Wallet Transaction History</h1>

          {loading ? (
            <p className="text-yellow-400">Loading transactions...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-400">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
              <table className="min-w-full bg-[#1e293b] text-sm">
                <thead className="text-left text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2 capitalize">
                        {getIcon(tx.type)}
                        {tx.type}
                      </td>
                      <td className="px-4 py-2 font-semibold text-green-300">
                        ₦{tx.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            tx.status === 'completed'
                              ? 'bg-green-600 text-white'
                              : tx.status === 'pending'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-red-500 text-white'
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