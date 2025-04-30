// File: src/pages/DealAnalytics.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DealAnalytics = () => {
  const [stats, setStats] = useState([
    { icon: <FiCheckCircle size={24} />, title: 'Completed Deals', count: 0, color: 'text-green-400' },
    { icon: <FiAlertCircle size={24} />, title: 'Disputed Deals', count: 0, color: 'text-yellow-400' },
    { icon: <FiXCircle size={24} />, title: 'Cancelled Deals', count: 0, color: 'text-red-400' },
  ]);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      const fetched = [
        { title: 'Completed Deals', count: 158 },
        { title: 'Disputed Deals', count: 9 },
        { title: 'Cancelled Deals', count: 23 },
      ];
      setStats((prev) =>
        prev.map((item) => ({
          ...item,
          count: fetched.find((f) => f.title === item.title)?.count || 0,
        }))
      );
    } catch {
      console.error('Failed to load deal analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadCSV = () => {
    const headers = ['Deal Status', 'Count'];
    const rows = stats.map((s) => [s.title, s.count]);
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(',')}\n${rows
      .map((r) => r.join(','))
      .join('\n')}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'deal_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const section = document.querySelector('.deal-analytics-panel');
    html2canvas(section).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(18);
      pdf.text('Dealcross Deal Analytics', 14, 15);
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 15, 30, imgWidth, imgHeight);
      pdf.save('deal_analytics.pdf');
    });
  };

  const totalDeals = stats.reduce((sum, s) => sum + s.count, 0);
  const completedPercent = totalDeals ? (stats[0].count / totalDeals) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>Deal Analytics - Dealcross</title>
        <meta name="description" content="Insights into deal performance on Dealcross including completion rates, disputes, and cancellations." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 deal-analytics-panel">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Deal Analytics</h2>
          <div className="flex gap-2">
            <button onClick={downloadCSV} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded">
              <FiDownload /> CSV
            </button>
            <button onClick={exportPDF} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded">
              <FiDownload /> PDF
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, index) => (
            <div key={index} className="bg-[#1e293b] p-6 rounded-lg shadow flex flex-col items-start">
              <div className={`mb-2 ${item.color}`}>{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold mt-2 animate-pulse">{loading ? '...' : item.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Deal Summary</h3>
          <p className="text-sm text-gray-400 mb-2">March 2025</p>
          <div className="w-full bg-gray-800 h-4 rounded overflow-hidden">
            <div
              className="bg-green-600 h-full transition-all duration-700"
              style={{ width: `${completedPercent}%` }}
              title={`Completed ${completedPercent.toFixed(1)}%`}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Completed ({stats[0].count})</span>
            <span>Disputed ({stats[1].count})</span>
            <span>Cancelled ({stats[2].count})</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealAnalytics;