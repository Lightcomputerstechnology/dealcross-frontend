// File: src/pages/PaymentStatusPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const PaymentStatusPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');  // ?status=success or ?status=failure

  const isSuccess = status === 'success';

  return (
    <>
      <Helmet><title>Payment Status - Dealcross</title></Helmet>
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center px-4 py-12">
        {isSuccess ? (
          <>
            <FiCheckCircle className="text-green-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-400 mb-6">Your wallet has been funded successfully.</p>
            <Link to="/wallet" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
              Go to Wallet
            </Link>
          </>
        ) : (
          <>
            <FiXCircle className="text-red-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
            <p className="text-gray-400 mb-6">There was an issue processing your payment. Please try again.</p>
            <Link to="/fund-wallet" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
              Retry Payment
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentStatusPage;