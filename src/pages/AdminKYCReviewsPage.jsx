import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import NotificationAlert from '@/components/common/NotificationAlert';

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
      console.error('KYC fetch error:', err);
      setAlert({ type: 'error', message: 'Failed to load KYC requests.' });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://d-final.onrender.com/admin/kyc-requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlert({ type: 'success', message: `KYC #${id} marked as ${status.toUpperCase()}.` });
      fetchKycRequests();
    } catch (err) {
      console.error('Status update error:', err);
      setAlert({ type: 'error', message: 'Failed to update status.' });
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  return (
    <>
      <Helmet>
        <title>KYC Review - Admin | Dealcross</title>
        <meta name="description" content="Admin dashboard to review user-submitted KYC documents." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">KYC Requests Review</h1>

        {alert.message && <NotificationAlert type={alert.type} message={alert.message} />}

        {loading ? (
          <p className="text-yellow-300">Loading requests...</p>
        ) : kycList.length === 0 ? (
          <p className="text-gray-400">No KYC submissions found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kycList.map((kyc) => (
              <div key={kyc.id} className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700">
                <p className="mb-1"><strong>User ID:</strong> {kyc.user_id}</p>
                <p className="mb-1"><strong>Type:</strong> {kyc.document_type}</p>
                <p className="mb-1"><strong>Status:</strong> <span className="text-yellow-400">{kyc.status}</span></p>
                <p className="mb-2">
                  <strong>Document:</strong>{' '}
                  <a
                    href={kyc.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-all"
                  >
                    View Document
                  </a>
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => updateStatus(kyc.id, 'approved')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(kyc.id, 'rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded"
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