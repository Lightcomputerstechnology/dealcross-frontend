// File: src/components/AdminSidebar.jsx

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
} from 'react-icons/fi';

const navItems = [
  { path: '/admin', icon: <FiBarChart2 />, label: 'Dashboard' },
  { path: '/users', icon: <FiUsers />, label: 'Users' },
  { path: '/dispute-log', icon: <FiAlertTriangle />, label: 'Disputes' },
  { path: '/deal-activity-log', icon: <FiClipboard />, label: 'Activity Log' },
  { path: '/analytics', icon: <FiPieChart />, label: 'Analytics' },
  { path: '/fraud-log', icon: <FiLock />, label: 'Fraud Reports' },
  { path: '/settings', icon: <FiSettings />, label: 'Settings' },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e293b] p-6 space-y-6 min-h-screen sticky top-0 shadow-md">
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
