// src/pages/AdminRealTimeMetrics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function AdminRealTimeMetrics() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('Loading...');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Admin login required.');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get('https://d-final.onrender.com/admin/realtime-metrics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setStatus(null);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setStatus('Failed to fetch real-time metrics.');
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Real-Time Metrics - Dealcross Admin</title>
        <meta
          name="description"
          content="Live analytics and system metrics for Dealcross administrators."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Live Admin Metrics</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-400 mt-1">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
          <span className="px-3 py-1 bg-green-700 text-xs rounded-full animate-pulse text-white">
            LIVE
          </span>
        </div>

        {status && <p className="text-yellow-400 mb-4">{status}</p>}

        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Active Users',
                value: stats.active_users,
                color: 'text-blue-300',
              },
              {
                label: 'Live Deals',
                value: stats.live_deals,
                color: 'text-purple-300',
              },
              {
                label: 'Recent Transactions',
                value: stats.recent_transactions,
                color: 'text-teal-300',
              },
              {
                label: 'Fraud Warnings',
                value: stats.fraud_alerts,
                color:
                  stats.fraud_alerts > 0 ? 'text-red-400' : 'text-green-400',
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-[#1e293b] p-6 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 duration-300 border border-gray-700"
              >
                <p className="text-sm text-gray-400">{card.label}</p>
                <h3 className={`text-4xl font-extrabold mt-2 ${card.color}`}>
                  {card.value}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
                  }
