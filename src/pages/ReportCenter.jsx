import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiFileText, FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ReportCenter = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/reports', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data || []);
    } catch (err) {
      toast.error('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = filter === 'All' ? reports : reports.filter((r) => r.type === filter);

  const downloadCSV = () => {
    const headers = 'Title,Type,Date\n';
    const rows = filteredReports.map((r) => `${r.title},${r.type},${r.date}`).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'report_center.csv';
    link.click();
  };

  const uniqueTypes = ['All', ...new Set(reports.map((r) => r.type))];

  return (
    <>
      <Helmet>
        <title>Report Center - Dealcross Admin</title>
        <meta name="description" content="Admin center for managing reported issues and alerts on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiFileText /> Report Center
          </h2>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            <FiDownload /> Download CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded ${
                filter === type ? 'bg-blue-600' : 'bg-gray-800'
              } hover:bg-blue-700 transition`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Report List */}
        {loading ? (
          <p className="text-yellow-400">Loading reports...</p>
        ) : filteredReports.length === 0 ? (
          <p className="text-gray-400">No reports found.</p>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <div
                key={index}
                className="bg-[#1e293b] p-4 rounded-lg shadow-md flex justify-between items-start hover:shadow-lg transition"
              >
                <div>
                  <h4 className="font-semibold">{report.title}</h4>
                  <p className="text-sm text-gray-400">{report.type}</p>
                </div>
                <p className="text-sm text-gray-400">{report.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReportCenter;