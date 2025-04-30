// File: src/pages/AnalyticsDashboard.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getChartData } from '@/api';
import AdminCharts from '@/components/admin/AdminCharts';

export default function AnalyticsDashboard() {
  const [chartPoints, setChartPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  const fetchChart = async () => {
    try {
      const result = await getChartData();
      setChartPoints(result.data || []);
    } catch (err) {
      console.error('Failed to load chart:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    const element = chartRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('dealcross_admin_metrics.pdf');
  };

  useEffect(() => {
    fetchChart();
    const interval = setInterval(fetchChart, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Analytics Dashboard - Dealcross</title>
        <meta name="description" content="Detailed metrics and performance analytics for Dealcross admins." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <button
          onClick={exportToPDF}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
        >
          Export PDF
        </button>
      </div>

      <div ref={chartRef}>
        {loading ? (
          <p className="text-yellow-400">Loading metrics...</p>
        ) : (
          <AdminCharts metrics={chartPoints} />
        )}
      </div>
    </div>
  );
    }
