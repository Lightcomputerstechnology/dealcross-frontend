// File: src/pages/FinancialReportsPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { FiDownload, FiFileText } from 'react-icons/fi';

const sampleReports = [
  { id: 1, title: 'Q1 2025 Revenue Report', date: 'March 31, 2025', amount: '$50,000' },
  { id: 2, title: 'Q1 2025 Escrow Volume', date: 'March 31, 2025', amount: '$120,000' },
];

const FinancialReportsPage = () => {
  const downloadCSV = () => {
    const headers = ['ID', 'Title', 'Date', 'Amount'];
    const rows = sampleReports.map(r => [r.id, r.title, r.date, r.amount]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financial_reports.csv';
    link.click();
  };

  const exportPDF = () => {
    alert('Export to PDF feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Financial Reports - Dealcross</title>
        <meta name="description" content="View and download financial reports for the Dealcross platform." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiFileText /> Financial Reports
        </h2>
        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2"
          >
            <FiDownload /> Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
          >
            <FiFileText /> Export PDF
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sampleReports.map((report) => (
          <div
            key={report.id}
            className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{report.title}</h3>
              <p className="text-sm text-gray-400">{report.date}</p>
            </div>
            <p className="font-bold text-green-400">{report.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialReportsPage;