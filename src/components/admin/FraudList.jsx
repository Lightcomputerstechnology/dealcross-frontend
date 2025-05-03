// File: src/components/admin/FraudList.jsx

import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';

const FraudList = ({ loading, fraudReports }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 5;

  const highlightKeywords = (text) => {
    const keywords = ['scam', 'suspicious', 'unauthorized', 'fraud'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, i) =>
      keywords.includes(part.toLowerCase()) ? (
        <span key={i} className="bg-red-600 text-white px-1 rounded">{part}</span>
      ) : (
        part
      )
    );
  };

  const filtered = fraudReports.filter((item) =>
    item.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const headers = [
    { label: "Message", key: "message" },
    { label: "Timestamp", key: "timestamp" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">
          Recent Alerts (Page {page} of {totalPages || 1})
        </h4>
        {fraudReports.length > 0 && (
          <CSVLink
            data={fraudReports}
            headers={headers}
            filename="fraud_alerts.csv"
            className="text-green-500 text-xs hover:underline"
          >
            Export CSV
          </CSVLink>
        )}
      </div>

      <input
        type="text"
        placeholder="Search fraud messages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded mb-4"
      />

      {loading ? (
        <p className="text-yellow-400 text-sm">Loading fraud alerts...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No fraud alerts found.</p>
      ) : (
        <ul className="space-y-3">
          {paginated.map((item, index) => (
            <li key={index} className="border-b border-gray-700 pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">
                    {highlightKeywords(item.message || '—')}
                  </p>
                  <span className="text-xs text-gray-400 block">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => toast.success('Marked as reviewed')}
                  className="ml-4 text-xs bg-green-700 hover:bg-green-800 px-2 py-1 rounded"
                >
                  Mark Reviewed
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > perPage && (
        <div className="flex justify-end gap-2 pt-2 text-xs">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-gray-700 px-3 py-1 rounded text-white disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-700 px-3 py-1 rounded text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FraudList;
