import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiBarChart2,
  FiUsers,
  FiAlertTriangle,
  FiClipboard,
  FiActivity,
  FiPieChart,
  FiLock,
  FiSettings,
  FiFileText,
  FiTrendingUp,
  FiList,
  FiSearch,
  FiCheckCircle,
  FiServer,
  FiRefreshCw,
  FiDatabase,
  FiFile,
  FiKey,
} from 'react-icons/fi';

const navItems = [
  { path: '/admin-dashboard', icon: <FiBarChart2 />, label: 'Dashboard' },
  { path: '/user-management', icon: <FiUsers />, label: 'All Users' },
  { path: '/user-controls', icon: <FiList />, label: 'User Controls' },
  { path: '/admin-kyc-reviews', icon: <FiCheckCircle />, label: 'KYC Reviews' },
  { path: '/dispute-log', icon: <FiAlertTriangle />, label: 'Disputes' },
  { path: '/admin-deals', icon: <FiClipboard />, label: 'Deal Log' },
  { path: '/pending-deals', icon: <FiActivity />, label: 'Pending Deals' },
  { path: '/admin-analytics', icon: <FiPieChart />, label: 'Analytics' },
  { path: '/fraud-log', icon: <FiLock />, label: 'Fraud Alerts' },
  { path: '/audit-log', icon: <FiFileText />, label: 'Audit Logs' },
  { path: '/admin-search', icon: <FiSearch />, label: 'Search Users' },
  { path: '/referral-logs', icon: <FiTrendingUp />, label: 'Referral Logs' },
  { path: '/real-time-metrics', icon: <FiRefreshCw />, label: 'Live Metrics' },
  { path: '/system-logs', icon: <FiDatabase />, label: 'System Logs' },
  { path: '/server-health', icon: <FiServer />, label: 'Server Health' },
  { path: '/exchange-rates', icon: <FiTrendingUp />, label: 'Exchange Rates' },
  { path: '/subscription-plans', icon: <FiKey />, label: 'Plan Manager' },
  { path: '/admin-settings', icon: <FiSettings />, label: 'Settings' },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e293b] p-6 space-y-6 min-h-screen sticky top-0 shadow-md z-50">
      <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
        Dealcross Admin
      </h2>
      <nav className="space-y-1 text-sm text-gray-300">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition duration-200 ${
                isActive
                  ? 'bg-gray-800 text-white font-semibold'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;