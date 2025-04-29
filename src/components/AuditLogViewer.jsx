// File: src/components/admin/AuditLogViewer.jsx

import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '@/api';
import { FiRefreshCw } from 'react-icons/fi';

const AuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Loading logs...');
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = async () => {
    setRefreshing(true);
    try {
      const data = await getAuditLogs();
      setLogs(data);
      setStatus(data.length === 0 ? 'No audit logs found.' : '');
    } catch (err) {
      setStatus('Failed to load audit logs.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Admin Audit Logs
        </h3>
        <button
          onClick={fetchLogs}
          disabled={refreshing}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
          aria-label="Refresh Audit Logs"
        >
          <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {status ? (
        <p className="text-yellow-600 dark:text-yellow-400 text-sm">{status}</p>
      ) : (
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 max-h-72 overflow-y-auto pr-1">
          {logs.map((log, idx) => (
            <li key={idx} className="border-b border-gray-700 pb-1">
              <span className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </span>
              <br />
              {log.action}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AuditLogViewer;