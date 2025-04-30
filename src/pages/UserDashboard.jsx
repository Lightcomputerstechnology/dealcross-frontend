import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);  // General loading state

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));

    const token = localStorage.getItem('token');
    if (!token) return;

    // Fetch wallet summary
    axios.get('https://d-final.onrender.com/wallet/my-wallet', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setWallet(res.data.wallet))
      .catch((error) => {
        toast.error("Failed to load wallet data.");
        console.error(error);
      });

    // Fetch KYC status
    axios.get('https://d-final.onrender.com/kyc/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setKycStatus(res.data.status))
      .catch((error) => {
        toast.error("Failed to load KYC status.");
        console.error(error);
      });

    // Fetch deals
    axios.get('https://d-final.onrender.com/deals/my-deals', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setDeals(res.data || []))
      .catch((error) => {
        toast.error("Failed to load deals.");
        console.error(error);
      })
      .finally(() => setLoading(false));  // Stop loading after data is fetched
  }, []);

  const ongoingDeals = deals.filter(d => d.status !== 'Completed');

  return (
    <>
      <Helmet>
        <title>My Dashboard - Dealcross</title>
        <meta name="description" content="User dashboard showing wallet, deals, KYC, and quick links." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">
          {user?.email ? `Welcome, ${user.email}` : 'Welcome!'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Here's your activity summary and quick links.
        </p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Wallet Balance */}
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-sm">Wallet Balance</h2>
            <p className="text-2xl font-bold mt-2">
              {wallet ? `USD ${wallet.balance.toFixed(2)}` : 'Loading...'}
            </p>
          </div>
          {/* KYC Status */}
          <div className="bg-green-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-sm">KYC Status</h2>
            <p className="text-2xl font-bold mt-2">
              {kycStatus ? kycStatus : 'Loading...'}
            </p>
          </div>
          {/* User Role */}
          <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-sm">User Role</h2>
            <p className="text-2xl font-bold mt-2">
              {user?.role || 'Standard'}
            </p>
          </div>
        </div>

        {/* Deals Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-sm">Total Deals</h2>
            <p className="text-2xl font-bold mt-2">{deals.length}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">
            <h2 className="text-sm">Ongoing Deals</h2>
            <p className="text-2xl font-bold mt-2">{ongoingDeals.length}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/fund-wallet"
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-5 rounded-lg shadow transition"
          >
            <h3 className="font-semibold text-lg">Fund Wallet</h3>
            <p className="text-sm text-gray-500">Top up your balance for deals</p>
          </Link>

          <Link
            to="/start-deal"
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-5 rounded-lg shadow transition"
          >
            <h3 className="font-semibold text-lg">Start a Deal</h3>
            <p className="text-sm text-gray-500">Open a new escrow transaction</p>
          </Link>

          <Link
            to="/profile"
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-5 rounded-lg shadow transition"
          >
            <h3 className="font-semibold text-lg">Profile Settings</h3>
            <p className="text-sm text-gray-500">Update email, password, or info</p>
          </Link>

          <Link
            to="/wallet-history"
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-5 rounded-lg shadow transition"
          >
            <h3 className="font-semibold text-lg">Wallet History</h3>
            <p className="text-sm text-gray-500">Review wallet transactions</p>
          </Link>

          <Link
            to="/deals"
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-5 rounded-lg shadow transition"
          >
            <h3 className="font-semibold text-lg">View All Deals</h3>
            <p className="text-sm text-gray-500">See your complete deal list</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;