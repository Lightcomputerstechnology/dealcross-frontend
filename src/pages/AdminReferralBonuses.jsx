import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiGift, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminReferralBonuses = () => {
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBonuses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/referral-bonuses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBonuses(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch referral bonuses.');
      toast.error(err.response?.data?.detail || 'Error loading bonus data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
    const interval = setInterval(fetchBonuses, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Referral Bonuses - Admin | Dealcross</title>
        <meta name="description" content="All referral bonus rewards paid to users." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiGift className="text-yellow-400" /> Referral Bonuses
          </h2>
          <button
            onClick={fetchBonuses}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading bonuses...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : bonuses.length === 0 ? (
          <p className="text-gray-400">No referral bonuses found.</p>
        ) : (
          <div className="space-y-4">
            {bonuses.map((bonus) => (
              <div
                key={bonus.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-gray-700 hover:bg-gray-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">
                      Inviter #{bonus.inviter_id} earned ${bonus.reward_amount}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Event: {bonus.event} — Invitee #{bonus.invitee_id}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(bonus.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminReferralBonuses;