// File: src/pages/DataExportPage.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const sampleData = [
  { id: 1, user: 'emilyrose', deal: 'Web Design', amount: 1200 },
  { id: 2, user: 'johnx', deal: 'Crypto Mentorship', amount: 500 },
  { id: 3, user: 'adebowale', deal: 'Affiliate Marketing', amount: 800 },
];

const DataExportPage = () => {
  const exportCSV = () => {
    const headers = ['ID', 'User', 'Deal', 'Amount'];
    const rows = sampleData.map((row) => [row.id, row.user, row.deal, row.amount]);
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dealcross_export.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Dealcross Export Report', 14, 15);
    doc.autoTable({
      startY: 25,
      head: [['ID', 'User', 'Deal', 'Amount']],
      body: sampleData.map((d) => [d.id, d.user, d.deal, `$${d.amount}`]),
    });
    doc.save('dealcross_export.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Data Export - Dealcross Admin</title>
        <meta name="description" content="Export deals and user data in CSV or PDF format from Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiFileText /> Data Export Center
          </h2>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-1">
              <FiDownload /> CSV
            </button>
            <button onClick={exportPDF} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-1">
              <FiDownload /> PDF
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full bg-[#1e293b] rounded-lg">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Deal</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.user}</td>
                  <td className="p-3">{item.deal}</td>
                  <td className="p-3">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

export default DataExportPage;