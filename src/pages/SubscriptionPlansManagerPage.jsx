import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiRefreshCw, FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const SubscriptionPlansManagerPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', duration: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/subscription-plans', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(response.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to fetch plans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setSubmitting(true);
    try {
      if (editingPlan) {
        await axios.patch(`https://d-final.onrender.com/admin/subscription-plans/${editingPlan.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Plan updated!');
      } else {
        await axios.post('https://d-final.onrender.com/admin/subscription-plans', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Plan added!');
      }
      setShowModal(false);
      setForm({ name: '', description: '', price: '', duration: '' });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this plan?');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://d-final.onrender.com/admin/subscription-plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Plan deleted.');
      fetchPlans();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Delete failed.');
    }
  };

  const openAddModal = () => {
    setForm({ name: '', description: '', price: '', duration: '' });
    setEditingPlan(null);
    setShowModal(true);
  };

  const openEditModal = (plan) => {
    setForm({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
    });
    setEditingPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Subscription Plans - Admin | Dealcross</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subscription Plans</h2>
        <div className="flex gap-2">
          <button onClick={fetchPlans} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            <FiRefreshCw /> Refresh
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            <FiPlus /> Add Plan
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-gray-400">No plans found.</p>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{plan.name}</p>
                <p className="text-sm text-gray-400">{plan.description}</p>
                <p className="text-green-400 font-bold mt-2">${plan.price} / {plan.duration} days</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(plan)}
                  className="flex items-center gap-1 bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  <FiEdit3 /> Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit} className="bg-[#1e293b] p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">{editingPlan ? 'Edit Plan' : 'Add Plan'}</h3>

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded bg-gray-800"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800"
              required
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800"
              required
            />

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 rounded">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                {submitting ? 'Saving...' : editingPlan ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlansManagerPage;
