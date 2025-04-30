// File: src/pages/FraudAnalysisPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const FraudAnalysisPage = () => {
  const [frauds, setFrauds] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFraudReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/fraud/reports', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFrauds(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to fetch fraud data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFraudReports();
  }, []);

  const filteredFrauds = frauds.filter((f) =>
    (f.user || '').toLowerCase().includes(filter.toLowerCase()) ||
    (f.alert_type || '').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Fraud Analysis - Dealcross Admin</title>
        <meta name="description" content="Detailed analysis of fraud activities detected on the Dealcross platform." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiAlertCircle className="text-red-400" /> Fraud Analysis
          </h2>
          <input
            type="text"
            placeholder="Filter by user or alert type..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded text-white w-full sm:w-80"
          />
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading fraud reports...</p>
        ) : filteredFrauds.length === 0 ? (
          <p className="text-gray-400">No fraud reports found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e293b] rounded-lg">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="p-3">User</th>
                  <th className="p-3">Alert Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredFrauds.map((fraud) => (
                  <tr key={fraud.id || fraud.alert_id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-3">{fraud.user || 'N/A'}</td>
                    <td className="p-3">{fraud.alert_type || 'N/A'}</td>
                    <td className={`p-3 font-medium ${fraud.status === 'resolved' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {fraud.status || 'pending'}
                    </td>
                    <td className="p-3 text-sm text-gray-400">
                      {fraud.created_at ? new Date(fraud.created_at).toLocaleString() : 'N/A'}
                    </td>
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

export default FraudAnalysisPage;