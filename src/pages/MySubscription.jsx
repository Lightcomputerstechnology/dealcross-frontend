import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

export default function MySubscription() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://d-final.onrender.com/subscription/my-plan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscription(res.data);
    } catch (err) {
      toast.error('Failed to fetch current subscription.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get('https://d-final.onrender.com/subscription/plans');
      setPlans(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load plans.');
    }
  };

  const handleActivate = async (planId) => {
    try {
      await axios.post(`https://d-final.onrender.com/subscription/activate/${planId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Subscription activated!');
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Activation failed.');
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-[#0f172a] text-white">
      <Helmet><title>My Subscription - Dealcross</title></Helmet>

      <h2 className="text-2xl font-bold mb-6">My Subscription</h2>

      {loading ? (
        <p className="text-yellow-400">Loading...</p>
      ) : subscription ? (
        <div className="bg-[#1e293b] p-6 rounded-lg mb-10">
          <h3 className="text-lg font-semibold mb-1">{subscription.name}</h3>
          <p className="text-sm text-gray-400">{subscription.description}</p>
          <p className="text-sm mt-2 text-green-400">Valid until: {new Date(subscription.expires_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p className="text-gray-400 mb-8">No active subscription. Choose one below:</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-[#1e293b] p-4 rounded-lg">
            <h4 className="font-bold text-lg">{plan.name}</h4>
            <p className="text-sm text-gray-400">{plan.description}</p>
            <p className="mt-2 text-green-300 font-semibold">${plan.price} / {plan.duration} days</p>
            {plan.benefits && plan.benefits.length > 0 && (
              <ul className="mt-3 text-sm text-gray-400 list-disc list-inside">
                {plan.benefits.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            )}
            <button
              onClick={() => handleActivate(plan.id)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
            >
              Activate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
