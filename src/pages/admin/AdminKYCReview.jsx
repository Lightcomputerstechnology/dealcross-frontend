import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import NotificationAlert from '@/components/common/NotificationAlert'; // Ensure this file exists

const AdminKYCReview = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const fetchKycRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/kyc-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKycList(res.data || []);
    } catch (err) {
      console.error('Failed to load KYC requests:', err);
      setAlert({ type: 'error', message: 'Error loading KYC requests.' });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://d-final.onrender.com/admin/kyc-requests/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlert({
        type: 'success',
        message: `KYC #${id} marked as ${newStatus.toUpperCase()}.`,
      });
      fetchKycRequests();
    } catch (err) {
      console.error('Failed to update status:', err);
      setAlert({ type: 'error', message: 'Failed to update KYC status.' });
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  return (
    <>
      <Helmet>
        <title>KYC Review - Admin | Dealcross</title>
        <meta name="description" content="Review and update user KYC verification status on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">KYC Requests Review</h1>

        {alert.message && (
          <NotificationAlert type={alert.type} message={alert.message} />
        )}

        {loading ? (
          <p className="text-yellow-400">Loading...</p>
        ) : kycList.length === 0 ? (
          <p className="text-gray-400">No KYC requests found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {kycList.map((kyc) => (
              <div
                key={kyc.id}
                className="bg-[#1e293b] p-5 rounded-lg shadow border border-gray-700"
              >
                <p><strong>User ID:</strong> {kyc.user_id}</p>
                <p><strong>Type:</strong> {kyc.document_type}</p>
                <p><strong>Status:</strong> <span className="text-yellow-300">{kyc.status}</span></p>
                <p className="truncate">
                  <strong>Document:</strong>{' '}
                  <a
                    href={kyc.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => updateStatus(kyc.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(kyc.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminKYCReview;
