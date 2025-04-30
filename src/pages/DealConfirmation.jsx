import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const DealConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const deal = location.state;

  const confirmDeal = () => {
    toast.success('Deal confirmed and submitted!');
    navigate('/deal-tracker');
  };

  if (!deal) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-700 dark:text-white px-4">
        <Helmet>
          <title>Deal Confirmation - Dealcross</title>
          <meta name="description" content="Confirm your new deal and proceed to track it securely." />
        </Helmet>
        <h2 className="text-xl font-semibold text-center">No deal information available</h2>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Deal Confirmation - Dealcross</title>
        <meta name="description" content="Review and confirm your escrow deal details before submission." />
      </Helmet>

      <main className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <h1 className="text-2xl font-bold text-center mb-4">Confirm Your Deal</h1>

          <div>
            <strong>Title:</strong>
            <p>{deal?.title || 'N/A'}</p>
          </div>
          <div>
            <strong>Amount (USD):</strong>
            <p>${deal?.amount || '0.00'}</p>
          </div>
          <div>
            <strong>Counterparty:</strong>
            <p>{deal?.counterparty || 'N/A'}</p>
          </div>
          <div>
            <strong>Description:</strong>
            <p>{deal?.description || 'N/A'}</p>
          </div>

          <button
            onClick={confirmDeal}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          >
            Confirm and Submit Deal
          </button>
        </div>
      </main>
    </>
  );
};

export default DealConfirmation;
