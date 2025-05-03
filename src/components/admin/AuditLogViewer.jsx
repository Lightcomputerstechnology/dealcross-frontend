import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '@/api';
import { FiRefreshCw } from 'react-icons/fi';
import { CSVLink } from 'react-csv';

const AuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Loading logs...');
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = async () => {
    setRefreshing(true);
    try {
      const data = await getAuditLogs();
      setLogs(data);
      setFiltered(data);
      setStatus(data.length === 0 ? 'No audit logs found.' : '');
    } catch (err) {
      setStatus('Failed to load audit logs.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (term) => {
    setSearch(term);
    const filteredLogs = logs.filter((log) =>
      log.action.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filteredLogs);
    setStatus(filteredLogs.length === 0 ? 'No matching logs found.' : '');
  };

  const headers = [
    { label: 'Timestamp', key: 'timestamp' },
    { label: 'Action', key: 'action' },
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Admin Audit Logs
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search logs..."
            className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
          />
          <CSVLink
            data={filtered}
            headers={headers}
            filename="audit_logs.csv"
            className="text-xs text-green-500 hover:underline"
          >
            Export CSV
          </CSVLink>
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
      </div>

      {status ? (
        <p className="text-yellow-600 dark:text-yellow-400 text-sm">{status}</p>
      ) : (
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.map((log, idx) => {
            const isRecent = new Date(log.timestamp) > new Date(Date.now() - 86400000); // 24 hrs
            return (
              <li
                key={idx}
                className={`border-b border-gray-700 pb-1 ${
                  isRecent ? 'text-green-400 font-medium' : ''
                }`}
              >
                <span className="text-xs text-gray-400 block">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                {log.action}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default AuditLogViewer;