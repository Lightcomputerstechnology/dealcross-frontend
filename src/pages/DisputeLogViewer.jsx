// File: src/pages/DisputeLogViewer.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const DisputeLogViewer = () => {
  useAuthRedirect({ adminOnly: true }); // ✅ Protect route

  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/disputes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDisputes(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to load disputes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://d-final.onrender.com/admin/disputes/${id}`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Dispute marked as ${newStatus}`);
      fetchDisputes(); // Refresh after update
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to update status.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Dispute Logs - Admin | Dealcross</title>
        <meta name="description" content="Admin panel for managing disputes on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dispute Management (Admin)</h2>
          <button
            onClick={fetchDisputes}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading disputes...</p>
        ) : disputes.length === 0 ? (
          <p className="text-yellow-400">No disputes found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e293b] rounded-lg text-sm">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Deal ID</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                  <th className="px-4 py-2 text-left">Submitted By</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute) => (
                  <tr key={dispute.id} className="border-t border-gray-600">
                    <td className="px-4 py-2">{dispute.deal_id || 'N/A'}</td>
                    <td className="px-4 py-2">{dispute.reason || 'N/A'}</td>
                    <td className="px-4 py-2">{dispute.submitted_by || 'N/A'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        dispute.status === 'Pending' ? 'bg-yellow-500 text-black' :
                        dispute.status === 'Resolved' ? 'bg-green-600' :
                        'bg-red-600'
                      }`}>
                        {dispute.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-300">
                      {new Date(dispute.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => updateStatus(dispute.id, 'Resolved')}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                      >
                        <FiCheckCircle /> Resolve
                      </button>
                      <button
                        onClick={() => updateStatus(dispute.id, 'Rejected')}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                      >
                        <FiXCircle /> Reject
                      </button>
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

export default DisputeLogViewer;