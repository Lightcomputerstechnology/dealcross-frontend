// File: src/pages/admin/AdminDisputePanel.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const AdminDisputePanel = () => {
  useAuthRedirect({ adminOnly: true });

  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Admin login required.');
      setLoading(false);
      return;
    }

    axios
      .get('https://d-final.onrender.com/admin/disputes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDisputes(res.data || []);
        if (!res.data || res.data.length === 0) setStatus('No disputes found.');
        else setStatus(null);
      })
      .catch(() => setStatus('Failed to load disputes.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Dispute Management - Dealcross Admin</title>
        <meta name="description" content="Review and manage all disputes raised by users on Dealcross." />
        <meta name="keywords" content="admin, dispute resolution, dealcross, conflict, deals" />
        <meta name="author" content="Dealcross Team" />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Admin Dispute Panel</h1>

        {loading ? (
          <p className="text-yellow-400">Loading disputes...</p>
        ) : status ? (
          <p className="text-yellow-400">{status}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e293b] rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-gray-300 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Deal ID</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((d, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-800 transition">
                    <td className="px-4 py-2">{d.deal_id}</td>
                    <td className="px-4 py-2">{d.user || 'Unknown'}</td>
                    <td className="px-4 py-2">{d.reason}</td>
                    <td className="px-4 py-2 text-yellow-300">{d.status}</td>
                    <td className="px-4 py-2 text-gray-400">{new Date(d.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDisputePanel;
