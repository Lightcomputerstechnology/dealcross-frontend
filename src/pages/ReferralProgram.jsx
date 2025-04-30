import React, { useState } from 'react';

const ReferralProgram = () => {
  const referralLink = 'https://dealcross.com/signup?ref=you123';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Referral Program</h2>

      {/* Referral Link Card */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-md mb-8">
        <p className="text-sm text-gray-300 mb-2">Your unique referral link:</p>
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded">
          <span className="truncate">{referralLink}</span>
          <button
            onClick={handleCopy}
            className="ml-4 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm font-medium"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg shadow text-center">
          <p className="text-sm text-gray-400">Users Referred</p>
          <h3 className="text-2xl font-bold mt-1">17</h3>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow text-center">
          <p className="text-sm text-gray-400">Earnings (USD)</p>
          <h3 className="text-2xl font-bold mt-1">$230.50</h3>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow text-center">
          <p className="text-sm text-gray-400">Pending Bonuses</p>
          <h3 className="text-2xl font-bold mt-1">$80.00</h3>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;