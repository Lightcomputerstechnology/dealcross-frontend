// File: src/pages/AdminSettingsPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiSettings, FiLock, FiBell } from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    twoFactor: false,
    notifyOnDispute: true,
  });

  // === Load settings from backend ===
  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(res.data);
    } catch {
      toast.error('Failed to load admin settings.');
    } finally {
      setLoading(false);
    }
  };

  // === Save single setting change ===
  const updateSetting = async (key, value) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://d-final.onrender.com/admin/settings`,
        { [key]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Updated ${key}`);
    } catch {
      toast.error(`Failed to update ${key}`);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Admin Settings - Dealcross</title>
        <meta name="description" content="Configure security and platform alerts." />
      </Helmet>

      <div className="flex items-center gap-2 mb-6">
        <FiSettings className="text-blue-400 text-2xl" />
        <h2 className="text-2xl font-bold">Admin Settings</h2>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading settings...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Security */}
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <FiLock className="text-green-400" />
              <h3 className="text-lg font-semibold">Security Settings</h3>
            </div>
            <div className="flex justify-between items-center">
              <span>Enable Two-Factor Authentication</span>
              <Switch
                checked={settings.twoFactor}
                onChange={(val) => {
                  setSettings({ ...settings, twoFactor: val });
                  updateSetting('twoFactor', val);
                }}
                className={`${
                  settings.twoFactor ? 'bg-green-600' : 'bg-gray-600'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    settings.twoFactor ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <FiBell className="text-yellow-400" />
              <h3 className="text-lg font-semibold">Notification Settings</h3>
            </div>
            <div className="flex justify-between items-center">
              <span>Alert for Dispute Submissions</span>
              <Switch
                checked={settings.notifyOnDispute}
                onChange={(val) => {
                  setSettings({ ...settings, notifyOnDispute: val });
                  updateSetting('notifyOnDispute', val);
                }}
                className={`${
                  settings.notifyOnDispute ? 'bg-green-600' : 'bg-gray-600'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    settings.notifyOnDispute ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
