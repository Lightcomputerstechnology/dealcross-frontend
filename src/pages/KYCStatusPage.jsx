// File: src/pages/KYCStatusPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getKYCStatus } from '@/api';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiFileText } from 'react-icons/fi';

const KYCStatusPage = () => {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await getKYCStatus();
      setKycData(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load KYC status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const exportCSV = () => {
    const headers = 'User ID,Document Type,Document URL,Status,Submitted At\n';
    const rows = kycData
      .map((item) => {
        const status = item.status.toUpperCase();
        const date = new Date(item.submitted_at).toLocaleString();
        return `${item.user_id},${item.document_type},${item.document_url},${status},${date}`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kyc_status.csv';
    link.click();
  };

  const exportPDF = () => {
    const section = document.getElementById('kyc-table-export');
    if (!section) return;

    html2canvas(section).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.text('Dealcross - KYC Status Report', 14, 15);
      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
      pdf.save('kyc_status.pdf');
    });
  };

  return (
    <>
      <Helmet>
        <title>KYC Status - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded shadow-lg space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">KYC Status</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={fetchStatus}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-md text-white text-sm transition-all duration-300"
              >
                Refresh
              </button>
              <button
                onClick={exportCSV}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 px-4 py-2 rounded-md text-white text-sm transition-all duration-300"
              >
                Export CSV
              </button>
              <button
                onClick={exportPDF}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 px-4 py-2 rounded-md text-white text-sm transition-all duration-300"
              >
                Export PDF
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-yellow-400 text-center">Loading...</p>
          ) : kycData.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <FiFileText className="mx-auto text-5xl text-blue-500" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No KYC documents submitted yet. Complete your KYC to get verified.
              </p>
              <a
                href="/kyc-upload"
                className="inline-block bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white px-5 py-2 rounded-md font-medium transition-all duration-300"
              >
                Upload KYC Documents
              </a>
            </div>
          ) : (
            <div id="kyc-table-export" className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-500 uppercase text-xs">
                    <th className="py-2 px-2">User ID</th>
                    <th className="px-2">Document Type</th>
                    <th className="px-2">Document</th>
                    <th className="px-2">Status</th>
                    <th className="px-2">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {kycData.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                    >
                      <td className="py-2 px-2">{item.user_id}</td>
                      <td className="px-2">{item.document_type}</td>
                      <td className="px-2">
                        <a
                          href={item.document_url}
                          className="text-blue-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </td>
                      <td
                        className={`px-2 font-semibold ${
                          item.status === 'approved'
                            ? 'text-green-500'
                            : item.status === 'rejected'
                            ? 'text-red-500'
                            : 'text-yellow-400'
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="px-2">{new Date(item.submitted_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
};

export default KYCStatusPage;