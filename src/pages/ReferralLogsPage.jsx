import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiUserPlus, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ReferralLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/referral-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load referral logs.');
      toast.error(err.response?.data?.detail || 'Failed to load referral logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Referral Logs - Admin | Dealcross</title>
        <meta name="description" content="Monitor user referral activities, bonuses, and invite statuses on Dealcross." />
        <meta name="keywords" content="referral, logs, admin, dealcross, bonuses, invites" />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiUserPlus className="text-green-400" /> Referral Logs
          </h2>
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading referral logs...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400">No referral logs found.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">
                      {log.referrer_username} invited {log.invitee_email}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Status: <span className={log.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}>{log.status}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReferralLogsPage;