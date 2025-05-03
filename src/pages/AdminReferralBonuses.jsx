import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiGift, FiRefreshCw } from 'react-icons/fi';

const AdminReferralBonuses = () => {
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBonuses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/referral-bonuses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBonuses(res.data || []);
    } catch (err) {
      toast.error('Failed to fetch referral bonuses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, []);

  return (
    <>
      <Helmet>
        <title>Referral Bonuses - Admin | Dealcross</title>
        <meta name="description" content="View all referral rewards paid to users on Dealcross." />
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
        ) : bonuses.length === 0 ? (
          <p className="text-gray-400">No referral rewards found.</p>
        ) : (
          <div className="space-y-4">
            {bonuses.map((bonus) => (
              <div
                key={bonus.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">
                      User #{bonus.inviter_id} earned ${bonus.reward_amount} from user #{bonus.invitee_id}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Event: <span className="text-green-400">{bonus.event}</span>
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