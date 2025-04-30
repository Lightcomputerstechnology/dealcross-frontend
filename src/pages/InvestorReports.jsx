// File: src/pages/InvestorReports.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const InvestorReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/investor/reports', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data || []);
    } catch (error) {
      toast.error('Failed to load investment reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      <Helmet>
        <title>Investor Reports - Dealcross</title>
        <meta name="description" content="Track your investment history and ROI reports on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Investor Reports</h2>

        {loading ? (
          <p className="text-yellow-400">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-400">No investment reports available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e293b] rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left text-sm border-b border-gray-700 text-gray-400">
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Amount Invested</th>
                  <th className="py-3 px-4">ROI</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((item, index) => (
                  <tr key={index} className="border-t border-gray-800 hover:bg-gray-700">
                    <td className="py-3 px-4">{item.company || 'N/A'}</td>
                    <td className="py-3 px-4">${item.amount?.toLocaleString() || '0.00'}</td>
                    <td className="py-3 px-4 text-green-400">{item.roi || '0%'}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default InvestorReports;