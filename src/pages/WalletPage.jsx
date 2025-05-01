// File: src/pages/WalletPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getWalletSummary } from '@/api';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { FiAlertCircle, FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';

const WalletPage = () => {
  useAuthRedirect();

  const [balance, setBalance] = useState(null);
  const [recent, setRecent] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWalletSummary();
        setBalance(data?.wallet?.balance || 0);
        setRecent(data?.recent_transactions || []);
        setStatus(null);
      } catch (err) {
        const msg = err.message || 'Unable to fetch wallet data.';
        setStatus(msg);
        toast.error(msg);
      }
    };

    fetchWallet();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wallet - Dealcross</title>
        <meta name="description" content="Check your Dealcross wallet balance and transactions." />
      </Helmet>

      <section className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center">My Wallet</h1>

          <div className="bg-[#1e293b] rounded-xl p-6 shadow-md">
            {balance !== null ? (
              <>
                <p className="text-sm text-gray-400">Available Balance</p>
                <h2 className="text-4xl font-extrabold mt-2">USD {balance.toFixed(2)}</h2>
              </>
            ) : (
              <div className="flex items-center gap-2 text-yellow-400">
                <FiAlertCircle className="text-xl animate-pulse" />
                <p>{status}</p>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <Link to="/fund-wallet">
                <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-semibold transition">
                  Fund Wallet
                </button>
              </Link>
              <Link to="/wallet-history">
                <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md font-semibold transition">
                  View History
                </button>
              </Link>
            </div>
          </div>

          {recent.length > 0 && (
            <div className="bg-[#1e293b] mt-6 p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
              <ul className="space-y-3 divide-y divide-gray-600">
                {recent.map((tx, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2 text-sm">
                    <div className="flex items-center gap-2 capitalize">
                      {tx.type === 'credit' ? (
                        <FiArrowDownCircle className="text-green-400" />
                      ) : (
                        <FiArrowUpCircle className="text-red-400" />
                      )}
                      {tx.type || 'N/A'}
                    </div>
                    <span className="font-mono text-right">${Number(tx.amount || 0).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recent.length === 0 && balance !== null && (
            <p className="text-center text-sm text-gray-400 mt-6">No recent transactions found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WalletPage;