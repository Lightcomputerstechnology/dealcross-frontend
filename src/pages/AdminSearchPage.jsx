// File: src/pages/AdminSearchPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  let debounceTimer;

  useEffect(() => {
    if (!query) {
      setResults([]);
      setStatus('');
      return;
    }

    setLoading(true);
    setStatus('');
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://d-final.onrender.com/admin/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.length > 0) {
          setResults(res.data);
          setStatus('');
        } else {
          setResults([]);
          setStatus('No matching results.');
        }
      } catch (err) {
        console.error('Search failed:', err);
        setStatus('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 300); // debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Admin Search - Dealcross</title>
        <meta name="description" content="Search across users, deals, and disputes in Dealcross admin panel." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiSearch /> Admin Search Center
        </h2>

        <input
          type="text"
          placeholder="Search users, deals, disputes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded mb-6"
        />

        {loading && <p className="text-blue-400">Searching...</p>}
        {status && <p className="text-yellow-400">{status}</p>}

        <div className="space-y-4">
          {results.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#1e293b] p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-blue-400 font-semibold">{item.type}: {item.label}</p>
              <p className="text-sm text-gray-400">{item.description || 'No description provided.'}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSearchPage;
