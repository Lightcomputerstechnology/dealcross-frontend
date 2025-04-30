// File: src/pages/AdminLogsViewer.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CSVLink } from 'react-csv';
import { FiDownload } from 'react-icons/fi';

export default function AdminLogsViewer() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('Admin login required.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://d-final.onrender.com/admin/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const logData = response.data || [];
        setLogs(logData);
        setFilteredLogs(logData);
        setStatus(logData.length ? null : 'No logs available.');
      } catch (error) {
        setStatus('Failed to fetch logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter(
      (log) =>
        log.action?.toLowerCase().includes(search.toLowerCase()) ||
        log.message?.toLowerCase().includes(search.toLowerCase()) ||
        log.user?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [search, logs]);

  const csvData = filteredLogs.map((log, i) => ({
    ID: i + 1,
    User: log.user || 'System',
    Action: log.action,
    Message: log.message,
    Timestamp: new Date(log.timestamp).toLocaleString(),
  }));

  return (
    <>
      <Helmet>
        <title>Logs Viewer - Dealcross Admin</title>
        <meta name="description" content="View system and dispute logs for auditing activity across Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dispute & System Logs</h1>
          {filteredLogs.length > 0 && (
            <CSVLink
              data={csvData}
              filename="dealcross_system_logs.csv"
              className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              <FiDownload /> Export CSV
            </CSVLink>
          )}
        </div>

        <input
          type="text"
          placeholder="Search by user, action, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-4 py-2 w-full md:w-1/2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />

        {loading ? (
          <p className="text-yellow-400">Loading logs...</p>
        ) : status ? (
          <p className="text-yellow-400">{status}</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
            <table className="min-w-full bg-[#1e293b] text-left">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/40">
                    <td className="px-4 py-2">{log.user || 'System'}</td>
                    <td className="px-4 py-2 font-medium text-blue-300">{log.action}</td>
                    <td className="px-4 py-2 text-gray-300">{log.message || '—'}</td>
                    <td className="px-4 py-2 text-sm text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
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
}
