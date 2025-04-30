import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getKYCRequests, approveKYC, rejectKYC } from '@/api';
import { toast } from 'react-hot-toast';
import { FiUserCheck, FiUserX, FiRefreshCw } from 'react-icons/fi';
import { useRequireAdmin } from '@/context/UserContext';

const AdminKYCApprovalPage = () => {
  const { user } = useRequireAdmin(); // ✅ Ensures admin role
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchKYCRequests = async () => {
    setRefreshing(true);
    try {
      const data = await getKYCRequests();
      setKycRequests(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load KYC requests.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveKYC(id);
      toast.success('KYC approved successfully.');
      fetchKYCRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to approve KYC.');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectKYC(id);
      toast.success('KYC rejected successfully.');
      fetchKYCRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to reject KYC.');
    }
  };

  useEffect(() => {
    fetchKYCRequests();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin KYC Approvals - Dealcross</title>
        <meta name="description" content="Review and approve Know Your Customer (KYC) documents submitted by users on Dealcross." />
        <meta property="og:title" content="Admin KYC Approval - Dealcross" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">KYC Approval Requests</h1>
            <button
              onClick={fetchKYCRequests}
              disabled={refreshing}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-300 text-sm transition"
            >
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-yellow-400 text-center">Loading KYC requests...</p>
          ) : kycRequests.length === 0 ? (
            <p className="text-center text-gray-400">No pending KYC requests.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-500 uppercase text-xs">
                    <th className="py-2 px-2">User ID</th>
                    <th className="px-2">Document Type</th>
                    <th className="px-2">Document</th>
                    <th className="px-2">Submitted At</th>
                    <th className="px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kycRequests.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-t border-gray-700 ${
                        idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
                      }`}
                    >
                      <td className="py-2 px-2">{item.user_id}</td>
                      <td className="px-2">{item.document_type}</td>
                      <td className="px-2">
                        <a
                          href={item.document_url}
                          className="text-blue-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      </td>
                      <td className="px-2">{new Date(item.submitted_at).toLocaleString()}</td>
                      <td className="px-2 flex gap-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 text-white px-3 py-1 rounded-md text-xs transition-all duration-300"
                        >
                          <FiUserCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 text-white px-3 py-1 rounded-md text-xs transition-all duration-300"
                        >
                          <FiUserX /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
};

export default AdminKYCApprovalPage;
