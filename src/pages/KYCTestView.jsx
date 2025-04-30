// File: src/pages/KYCTestView.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const KYCTestView = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const fetchKYCStatus = async () => {
    if (!token) {
      setError('Token is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://d-final.onrender.com/kyc/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKycList(response.data || []);
    } catch (err) {
      setError('Failed to fetch KYC data. Please check your token.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKYCStatus();
  }, []); // Only auto-fetch on mount if token is preset

  return (
    <>
      <Helmet>
        <title>KYC Test View - Dealcross</title>
        <meta name="description" content="Manually test your KYC status on the Dealcross platform using a token." />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow-lg space-y-6">
          <h1 className="text-xl font-bold">Test Your KYC Status</h1>

          <input
            type="text"
            placeholder="Enter your JWT token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
          />

          <button
            onClick={fetchKYCStatus}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
          >
            Fetch KYC Status
          </button>

          {loading ? (
            <p className="text-center text-yellow-400">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : kycList.length === 0 ? (
            <p className="text-center text-gray-500">No KYC records found.</p>
          ) : (
            <div className="space-y-4">
              {kycList.map((item) => (
                <div key={item.id} className="border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                  <p><strong>Type:</strong> {item.document_type}</p>
                  <p><strong>Status:</strong> <span className={`font-semibold ${
                    item.status === 'approved' ? 'text-green-500' :
                    item.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                  }`}>{item.status.toUpperCase()}</span></p>
                  <p><strong>Submitted:</strong> {new Date(item.submitted_at).toLocaleString()}</p>
                  <p><strong>Document:</strong>{' '}
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KYCTestView;