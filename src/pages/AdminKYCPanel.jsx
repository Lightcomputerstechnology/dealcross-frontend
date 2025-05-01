import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const AdminKYCPanel = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const fetchKYCSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/kyc-submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKycList(response.data);
    } catch (error) {
      console.error('Failed to load KYC submissions:', error);
      setStatus('Failed to load KYC submissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://d-final.onrender.com/admin/kyc-decision/${id}`,
        { decision },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus(`KYC #${id} marked as ${decision}.`);
      fetchKYCSubmissions();
    } catch (err) {
      console.error(err);
      setStatus('Action failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchKYCSubmissions();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin KYC Panel - Dealcross</title>
        <meta name="description" content="Manage and review user KYC submissions on Dealcross as an admin." />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-white py-10 px-4">
        <motion.div
          className="max-w-6xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">KYC Review Panel</h1>

          {status && (
            <motion.p
              className="text-center mb-4 text-yellow-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.p>
          )}

          {loading ? (
            <p className="text-center text-yellow-300">Loading KYC submissions...</p>
          ) : kycList.length === 0 ? (
            <p className="text-center text-gray-400">No pending KYC records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <motion.table
                className="w-full text-sm border-spacing-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <thead>
                  <tr className="uppercase text-xs text-gray-400 border-b border-gray-700">
                    <th className="py-2 px-2">User ID</th>
                    <th>Type</th>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kycList.map((item) => (
                    <motion.tr
                      key={item.id}
                      className="bg-gray-800 border border-gray-700 rounded"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * item.id }}
                    >
                      <td className="py-2 px-2">{item.user_id}</td>
                      <td className="px-2">{item.document_type}</td>
                      <td className="px-2">
                        <a
                          href={item.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          View
                        </a>
                      </td>
                      <td className="px-2 text-yellow-400 capitalize">{item.status}</td>
                      <td className="px-2">{new Date(item.submitted_at).toLocaleString()}</td>
                      <td className="px-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDecision(item.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecision(item.id, 'rejected')}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdminKYCPanel;
