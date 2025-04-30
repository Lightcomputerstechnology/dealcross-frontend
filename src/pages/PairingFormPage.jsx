// File: src/pages/PairingFormPage.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { pairWithCounterparty } from '@/api';
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const PairingFormPage = () => {
  useAuthRedirect();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [pairingId, setPairingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePair = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Enter counterparty email.');
      return;
    }
    setSubmitting(true);
    try {
      const data = await pairWithCounterparty(email);
      setPairingId(data.id);
      setStatus('Pairing request sent. Waiting for confirmation.');
      toast.success('Pairing initiated!');
    } catch (err) {
      setStatus(err.message || 'Pairing failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Pair with Counterparty - Dealcross</title></Helmet>
      <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white px-4 py-12">
        <form onSubmit={handlePair} className="w-full max-w-md bg-[#1e293b] p-6 rounded-xl space-y-4 shadow-lg">
          <h2 className="text-xl font-semibold text-center">Pair with Counterparty</h2>
          <input
            type="email"
            placeholder="Enter counterparty email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-600"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded font-semibold transition ${
              submitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Processing...' : 'Send Pairing Request'}
          </button>
          {status && <p className="text-center text-yellow-400">{status}</p>}
          {pairingId && (
            <p className="text-center text-green-400 text-sm mt-2">
              Pairing ID: {pairingId} (save for reference)
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default PairingFormPage;