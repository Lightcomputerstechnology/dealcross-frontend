import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getWalletSummary } from '@/api';  // ✅ Corrected import
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { FiAlertCircle } from 'react-icons/fi';

const WalletPage = () => {
  useAuthRedirect();

  const [balance, setBalance] = useState(null);
  const [recent, setRecent] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWalletSummary();
        setBalance(data.wallet?.balance || 0);
        setRecent(data.recent_transactions || []);
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
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Wallet</h2>

        <div className="bg-[#1e293b] p-6 rounded-lg shadow space-y-4">
          {balance !== null ? (
            <>
              <p className="text-sm text-gray-400">Available Balance</p>
              <h1 className="text-4xl font-bold">USD {balance.toFixed(2)}</h1>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <FiAlertCircle className="text-yellow-400 text-xl animate-pulse" />
              <p className="text-yellow-400">{status}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/fund-wallet">
              <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md">
                Fund Wallet
              </button>
            </Link>
          </div>

          {recent.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
              <ul className="space-y-2">
                {recent.map((tx, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-gray-600 py-2"
                  >
                    <span>{tx.type?.toUpperCase() || 'UNKNOWN'}</span>
                    <span>${Number(tx.amount).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletPage;