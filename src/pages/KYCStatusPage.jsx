// File: src/pages/KYCStatusPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getKYCStatus } from '@/api';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiFileText } from 'react-icons/fi';

export default function KYCStatusPage() {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await getKYCStatus();
      setKycData(data || []);
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
    const rows = kycData.map(item => {
      const date = new Date(item.submitted_at).toLocaleString();
      return `${item.user_id},${item.document_type},${item.document_url},${item.status.toUpperCase()},${date}`;
    }).join('\n');
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

      <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow space-y-6">
          {/* Header + Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">KYC Status</h1>
            <div className="flex flex-wrap gap-2">
              <button onClick={fetchStatus} className="btn-primary">Refresh</button>
              <button onClick={exportCSV} className="btn-outline text-green-500 border-green-500 hover:bg-green-100 dark:hover:bg-green-900">Export CSV</button>
              <button onClick={exportPDF} className="btn-outline text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900">Export PDF</button>
            </div>
          </div>

          {/* Status Message or Table */}
          {loading ? (
            <p className="text-yellow-400 text-center">Loading...</p>
          ) : kycData.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="text-5xl text-blue-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No KYC documents submitted yet.</p>
              <a href="/kyc-upload" className="mt-4 inline-block btn-primary">Upload KYC</a>
            </div>
          ) : (
            <div id="kyc-table-export" className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">User ID</th>
                    <th className="px-4 py-2">Document Type</th>
                    <th className="px-4 py-2">Document</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {kycData.map((item, i) => (
                    <tr key={item.id} className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} border-b border-gray-200 dark:border-gray-700`}>
                      <td className="px-4 py-2">{item.user_id}</td>
                      <td className="px-4 py-2">{item.document_type}</td>
                      <td className="px-4 py-2">
                        <a href={item.document_url} className="text-blue-500 underline" target="_blank" rel="noreferrer">View</a>
                      </td>
                      <td className={`px-4 py-2 font-medium ${item.status === 'approved' ? 'text-green-500' : item.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {item.status}
                      </td>
                      <td className="px-4 py-2">{new Date(item.submitted_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Styles for animation */}
        <style>{`
          .btn-primary {
            @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition;
          }
          .btn-outline {
            @apply border text-sm px-4 py-2 rounded transition;
          }
        `}</style>
      </div>
    </>
  );
}