import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminWalletControl = () => {
  const [logs, setLogs] = useState([]);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('credit');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await API.get('/admin-wallet/logs');
      setLogs(res);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await API.get('/admin-wallet/balance');
      setBalance(res.balance);
    } catch (err) {
      setStatus('Could not fetch balance.');
    }
  };

  const handleAdjust = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/admin-wallet/adjust', {
        amount: parseFloat(amount),
        action,
        description,
      });
      setStatus(res.message);
      setAmount('');
      setDescription('');
      await fetchLogs();
      await fetchBalance();
    } catch (err) {
      setStatus(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
    fetchBalance();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Wallet Manager</h2>

      {balance !== null && (
        <div className="mb-6 text-xl font-semibold text-center">
          Current Balance:{' '}
          <span className="text-green-600 dark:text-green-400">${balance.toFixed(2)}</span>
        </div>
      )}

      {status && (
        <div className="mb-4 text-center text-sm text-blue-600 dark:text-blue-400">
          {status}
        </div>
      )}

      <form
        onSubmit={handleAdjust}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow mb-10"
      >
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 px-4 py-2 text-white font-semibold rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Submit Adjustment'}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Recent Admin Wallet Logs</h3>
      <div className="overflow-auto border rounded-lg dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
            <tr>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">By</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No logs yet.
                </td>
              </tr>
            )}
            {logs.map((log, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                } border-t dark:border-gray-700`}
              >
                <td className="px-4 py-2">${log.amount.toFixed(2)}</td>
                <td className="px-4 py-2 capitalize">{log.action}</td>
                <td className="px-4 py-2">{log.description}</td>
                <td className="px-4 py-2">{log.by || 'system'}</td>
                <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWalletControl;