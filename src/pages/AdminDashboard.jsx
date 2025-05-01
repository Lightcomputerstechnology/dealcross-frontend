// File: src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import CountUp from 'react-countup';
import { FiAlertCircle, FiMessageSquare, FiBarChart2, FiUsers, FiSettings, FiBriefcase, FiClipboard, FiMenu } from 'react-icons/fi';

import MetricsCard from '@/components/admin/MetricsCard';
import FraudList from '@/components/admin/FraudList';
import AuditLogViewer from '@/components/admin/AuditLogViewer';
import PendingDealList from '@/components/admin/PendingDealList';
import UserControlList from '@/components/admin/UserControlList';
import AdminCharts from '@/components/admin/AdminCharts';

import { getAdminMetrics, getFraudReports } from '@/api';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const AdminDashboard = () => {
  useAuthRedirect({ adminOnly: true });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [fraudReports, setFraudReports] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingFraud, setLoadingFraud] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await getAdminMetrics();
      setMetrics(res);
      setLastRefreshed(new Date());
    } catch (err) {
      toast.error('Failed to fetch metrics.');
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchFraudReports = async () => {
    try {
      const res = await getFraudReports();
      setFraudReports(res);
    } catch (err) {
      toast.error('Failed to fetch fraud reports.');
    } finally {
      setLoadingFraud(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchFraudReports();
    const interval = setInterval(() => {
      fetchMetrics();
      fetchFraudReports();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Dealcross</title>
        <meta name="description" content="Admin dashboard overview for Dealcross system and user control." />
        <meta property="og:title" content="Admin Dashboard - Dealcross" />
        <meta property="og:description" content="Monitor platform activities, user controls, fraud alerts, and more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="flex min-h-screen bg-[#0f172a] text-white">
        {/* Sidebar */}
        <aside className={`fixed md:static w-64 bg-[#1e293b] p-6 space-y-6 z-30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <h2 className="text-2xl font-bold mb-6">Dealcross</h2>
          <nav className="space-y-4 text-sm">
            <Link to="/admin" className="flex items-center gap-2 hover:text-blue-400"><FiBarChart2 /> Dashboard</Link>
            <Link to="/users" className="flex items-center gap-2 hover:text-blue-400"><FiUsers /> Users</Link>
            <Link to="/deal-analytics" className="flex items-center gap-2 hover:text-blue-400"><FiBriefcase /> Deals</Link>
            <Link to="/dispute-log" className="flex items-center gap-2 hover:text-blue-400"><FiAlertCircle /> Disputes</Link>
            <Link to="/settings" className="flex items-center gap-2 hover:text-blue-400"><FiSettings /> Settings</Link>
            <Link to="/admin-deal-log" className="flex items-center gap-2 hover:text-blue-400"><FiClipboard /> Deal Logs</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 space-y-10 w-full">
          <div className="md:hidden mb-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white bg-gray-700 p-2 rounded-lg">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={() => {
              setLoadingMetrics(true);
              setLoadingFraud(true);
              fetchMetrics();
              fetchFraudReports();
            }}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Refresh Dashboard {lastRefreshed && <span className="text-xs ml-2">(Last: {lastRefreshed.toLocaleTimeString()})</span>}
          </button>

          {/* Metrics */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Live System Metrics</h2>
            {loadingMetrics ? (
              <p className="text-sm text-yellow-400">Loading metrics...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m) => (
                  <MetricsCard key={m.id} type={m.type} value={<CountUp end={m.value} duration={2} />} timestamp={m.timestamp} />
                ))}
              </div>
            )}
          </section>

          {/* Charts */}
          <section className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Platform Activity Charts</h2>
            <AdminCharts />
          </section>

          {/* Fraud Alerts */}
          <section className="bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FiAlertCircle /> Fraud Alerts
            </h3>
            <FraudList loading={loadingFraud} fraudReports={fraudReports} />
          </section>

          {/* Audit Logs */}
          <section className="bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Admin Audit Logs</h3>
            <AuditLogViewer />
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
