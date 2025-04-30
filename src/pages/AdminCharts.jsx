// File: src/pages/AdminCharts.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getAdminChartData, getCurrentUser } from '@/api';
import { toast } from 'react-hot-toast';
import JSZip from 'jszip';

const AdminCharts = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('Loading charts...');
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('7');
  const [include, setInclude] = useState({ deals: true, users: true, kyc: true, disputes: true, volume: true });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user.role !== 'admin') {
        setIsAdmin(false);
        toast.error('Access denied. Admins only.');
        return;
      }
      setIsAdmin(true);
      const result = await getAdminChartData(timeframe);
      setData(result);
      setStatus(null);
    } catch (err) {
      setStatus('Failed to load admin data.');
      toast.error(err.message || 'Chart loading error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
        setCountdown(30);
      }
    }, 30000);
    const timer = setInterval(() => autoRefresh && setCountdown((c) => (c > 0 ? c - 1 : 30)), 1000);
    return () => { clearInterval(interval); clearInterval(timer); };
  }, [timeframe, autoRefresh]);

  const downloadCSV = async () => {
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `data:text/csv;charset=utf-8,${headers}\n${rows}`;
  };

  const exportToPDF = async () => {
    const chartSection = document.querySelector('.admin-chart-panel');
    const canvas = await html2canvas(chartSection);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.text('Dealcross Admin Analytics Report', 14, 15);
    pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
    return pdf.output('blob');
  };

  const downloadAll = async () => {
    const csvURI = await downloadCSV();
    const pdfBlob = await exportToPDF();
    const zip = new JSZip();
    zip.file('admin_chart_data.csv', await fetch(csvURI).then(res => res.text()));
    zip.file('admin_charts.pdf', pdfBlob);
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'admin_charts_report.zip';
      link.click();
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Charts - Dealcross</title>
        <meta name="description" content="Analytics charts for admin insights on Dealcross" />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Visual Analytics</h1>
          <div className="flex gap-2 items-center mt-4 md:mt-0">
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="bg-gray-800 text-white px-3 py-2 rounded">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
            <button onClick={() => setAutoRefresh(!autoRefresh)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded">
              {autoRefresh ? `Pause (${countdown}s)` : 'Resume Auto-Refresh'}
            </button>
            <button onClick={fetchData} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button onClick={downloadAll} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">
              Download Report ZIP
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {['deals', 'users', 'kyc', 'disputes', 'volume'].map((key) => (
            <label key={key} className="flex gap-2 items-center">
              <input type="checkbox" checked={include[key]} onChange={() => setInclude({ ...include, [key]: !include[key] })} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {isAdmin === false && <p className="text-red-400 font-medium text-center mt-6">Access Denied: This page is for admins only.</p>}
        {status && isAdmin !== false && <p className="text-yellow-400">{status}</p>}

        {!status && isAdmin && (
          <div className="space-y-12 admin-chart-panel">
            {include.deals && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Deals Created (Last {timeframe} Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deals" fill="#38bdf8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {include.users && (
              <div>
                <h3 className="text-lg font-semibold mb-4">User Signups</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#4ade80" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCharts;
