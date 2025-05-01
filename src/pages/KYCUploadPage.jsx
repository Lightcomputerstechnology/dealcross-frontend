import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { getKYCStatus } from '@/api'; // assuming you’ve imported this already
import { useUser } from '@/context/UserContext';

const KYCUploadPage = () => {
  const { user } = useUser(); // get logged-in user
  const [form, setForm] = useState({ document_type: '', document_file: null });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchKycStatus = async () => {
    try {
      const data = await getKYCStatus();
      setKycStatus(data);
    } catch (err) {
      setKycStatus(null);
    }
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'document_file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const formData = new FormData();
      formData.append('document_type', form.document_type);
      formData.append('document_file', form.document_file);

      await uploadKYC(formData);
      setStatus({ type: 'success', message: 'KYC submitted successfully.' });
      fetchKycStatus();
      setForm({ document_type: '', document_file: null });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to submit KYC.' });
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
