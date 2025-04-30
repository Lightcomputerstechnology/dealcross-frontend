import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { getConfirmedPairing } from '@/api';

const StartDealPage = () => {
  useAuthRedirect();

  const [pairingConfirmed, setPairingConfirmed] = useState(false);
  const [loadingPairing, setLoadingPairing] = useState(true);

  const [role, setRole] = useState('buyer');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [escrowType, setEscrowType] = useState('standard');
  const [category, setCategory] = useState('product');
  const [customCategory, setCustomCategory] = useState('');
  const [message, setMessage] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const MAX_FILE_SIZE_MB = 10;

  useEffect(() => {
    const checkPairing = async () => {
      try {
        const data = await getConfirmedPairing();
        if (data.status === 'confirmed') {
          setPairingConfirmed(true);
        } else {
          toast.error('Pairing not confirmed yet.');
        }
      } catch (err) {
        toast.error(err.message || 'Pairing check failed.');
      } finally {
        setLoadingPairing(false);
      }
    };
    checkPairing();
  }, []);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const valid = selected.filter((f) => f.size / 1024 / 1024 <= MAX_FILE_SIZE_MB);
    setFiles(valid);
    if (selected.length !== valid.length) {
      toast.error(`Some files exceeded ${MAX_FILE_SIZE_MB}MB limit.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pairingConfirmed) {
      setStatus('Pairing confirmation required before starting a deal.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Login required.');
      return;
    }

    setSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('role', role);
    formData.append('counterparty_email', email);
    formData.append('amount', parseFloat(amount));
    formData.append('escrow_type', escrowType);
    formData.append('category', category === 'other' ? customCategory : category);
    formData.append('message', message);
    if (expectedDate) formData.append('expected_completion', expectedDate);
    files.forEach((file) => formData.append('attachments', file));

    try {
      const response = await axios.post(
        'https://d-final.onrender.com/deals/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setStatus('Deal created successfully!');
        setTitle('');
        setEmail('');
        setAmount('');
        setEscrowType('standard');
        setCategory('product');
        setCustomCategory('');
        setMessage('');
        setExpectedDate('');
        setFiles([]);
      } else {
        setStatus('Deal creation failed.');
      }
    } catch (err) {
      setStatus(err.response?.data?.detail || 'Error creating deal.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPairing) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white">
        <p className="text-lg animate-pulse">Checking pairing confirmation...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Start a Deal - Dealcross</title>
      </Helmet>

      <main className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center px-4 py-12">
        {!pairingConfirmed ? (
          <p className="text-center text-yellow-400 text-lg">
            Pairing not confirmed. Please complete pairing before creating a deal.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-[#1e293b] p-6 rounded-xl shadow-lg space-y-4"
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-semibold text-center">Start a Deal</h2>

            <input
              type="text"
              placeholder="Deal Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            />

            <input
              type="email"
              placeholder="Counterparty Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            />

            <input
              type="number"
              placeholder="Amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            >
              <option value="product">Product / Goods</option>
              <option value="service">Service / Freelance</option>
              <option value="real-estate">Real Estate</option>
              <option value="vehicle">Vehicle / Transport</option>
              <option value="electronics">Electronics & Gadgets</option>
              <option value="crypto">Crypto & Digital Assets</option>
              <option value="consultation">Consultation / Coaching</option>
              <option value="event">Event Planning / Tickets</option>
              <option value="other">Others (Custom)</option>
            </select>

            {category === 'other' && (
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
              />
            )}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Enter deal message or details..."
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            />

            <select
              value={escrowType}
              onChange={(e) => setEscrowType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            >
              <option value="standard">Standard</option>
              <option value="milestone">Milestone</option>
            </select>

            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            />

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-300">{files.length} file(s) selected</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-2 rounded font-semibold transition ${
                submitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Submitting...' : 'Create Deal'}
            </button>

            {status && <p className="text-center text-yellow-400 mt-2">{status}</p>}
          </form>
        )}
      </main>
    </>
  );
};

export default StartDealPage;