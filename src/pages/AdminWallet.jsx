import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api';
import {
  getAdminWalletLogs,
  adjustAdminWallet,
} from '../api/adminWallet'; // You will create these helper functions
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';

const AdminWallet = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ amount: '', action: 'credit', description: '' });

  const fetchData = async () => {
    try {
      const me = await getCurrentUser();
      if (me.role !== 'admin') return toast.error('Access denied');
      setUser(me);

      const logData = await getAdminWalletLogs();
      setLogs(logData || []);
      if (logData.length > 0) {
        setBalance(logData[0].new_balance ?? null);
      }
    } catch (err) {
      toast.error('Failed to load admin wallet');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!form.amount || isNaN(form.amount)) {
      return toast.error('Invalid amount');
    }

    try {
      const res = await adjustAdminWallet(form);
      toast.success(res.message);
      setForm({ amount: '', action: 'credit', description: '' });
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Adjustment failed');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Admin Wallet Management</h2>

      <Card>
        <CardContent className="py-4">
          <p className="text-lg font-semibold">Current Balance: {balance !== null ? `₦${balance}` : 'Loading...'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Manual Adjustment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <select
              className="border rounded px-3 py-2"
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
          <Textarea
            placeholder="Reason / Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h3 className="font-semibold">Transaction Logs</h3>
          {logs.length === 0 ? (
            <p>No log history found.</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="border-b py-2 text-sm">
                <p><strong>{log.action.toUpperCase()}</strong> ₦{log.amount} - {log.description}</p>
                <p className="text-gray-500">By: {log.by} | {new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWallet;