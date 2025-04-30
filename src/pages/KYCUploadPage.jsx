import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const KYCUploadPage = () => {
  const [form, setForm] = useState({ user_id: '', document_type: '', document_file: null });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch KYC status
  const fetchKycStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/kyc/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKycStatus(res.data);
    } catch (err) {
      console.error(err);
      setKycStatus(null);
    }
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document_file') {
      setForm({ ...form, document_file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({ user_id: '', document_type: '', document_file: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData();
    formData.append('user_id', form.user_id);
    formData.append('document_type', form.document_type);
    formData.append('document_file', form.document_file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://d-final.onrender.com/kyc/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStatus({ type: 'success', message: 'KYC submitted successfully.' });
        resetForm();
        fetchKycStatus(); // Refresh status
      } else {
        setStatus({ type: 'error', message: 'Unexpected response. Please try again.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.response?.data?.detail || 'Failed to submit KYC.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>KYC Upload - Dealcross</title>
        <meta name="description" content="Submit your KYC for verification on Dealcross" />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-10 px-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">KYC Upload</h1>

          {kycStatus ? (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400">Current KYC Status:</p>
              <p className={`text-lg font-semibold ${
                kycStatus.status === 'verified' ? 'text-green-400' :
                kycStatus.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {kycStatus.status.toUpperCase()}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-6 text-center">No KYC status found.</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="user_id" className="block mb-1">User ID</label>
              <input
                type="number"
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800"
                placeholder="Enter your user ID"
                required
              />
            </div>
            <div>
              <label htmlFor="document_type" className="block mb-1">Document Type</label>
              <select
                name="document_type"
                value={form.document_type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800"
                required
              >
                <option value="">Select Type</option>
                <option value="passport">Passport</option>
                <option value="ID card">ID Card</option>
                <option value="driver_license">Driver’s License</option>
              </select>
            </div>
            <div>
              <label htmlFor="document_file" className="block mb-1">Upload Document</label>
              <input
                type="file"
                name="document_file"
                accept="image/*,application/pdf"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              {loading ? 'Submitting...' : 'Submit KYC'}
            </button>
          </form>

          {status.message && (
            <p className={`mt-4 text-center ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default KYCUploadPage;