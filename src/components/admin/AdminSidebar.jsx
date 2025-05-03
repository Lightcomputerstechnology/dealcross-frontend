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
  FiFile,
  FiFileText,
  FiTrendingUp,
  FiBell,
  FiGift,
} from 'react-icons/fi';

const navItems = [
  {
    section: 'Core',
    links: [
      { path: '/admin-dashboard', icon: <FiBarChart2 />, label: 'Dashboard' },
      { path: '/user-management', icon: <FiUsers />, label: 'Users' },
      { path: '/dispute-log', icon: <FiAlertTriangle />, label: 'Disputes' },
      { path: '/admin-deals', icon: <FiClipboard />, label: 'Deal Log' },
      { path: '/admin-analytics', icon: <FiPieChart />, label: 'Analytics' },
      { path: '/fraud-log', icon: <FiLock />, label: 'Fraud Reports' },
      { path: '/admin-settings', icon: <FiSettings />, label: 'Admin Settings' },
    ],
  },
  {
    section: 'Referral & Promo',
    links: [
      { path: '/admin/referral-bonuses', icon: <FiGift />, label: 'Referral Bonuses' },
      { path: '/mobile-promo', icon: <FiTrendingUp />, label: 'Mobile Promo' },
    ],
  },
  {
    section: 'Reports & Insights',
    links: [
      { path: '/fraud-analysis', icon: <FiAlertTriangle />, label: 'Fraud Analysis' },
      { path: '/data-export', icon: <FiFile />, label: 'Data Export' },
      { path: '/api-usage', icon: <FiActivity />, label: 'API Usage Stats' },
      { path: '/financial-reports', icon: <FiPieChart />, label: 'Financial Reports' },
      { path: '/admin-charts', icon: <FiBarChart2 />, label: 'Live Charts' },
    ],
  },
  {
    section: 'Extras',
    links: [
      { path: '/pitch-deck', icon: <FiFileText />, label: 'Pitch Deck Viewer' },
      { path: '/ai-insight', icon: <FiPieChart />, label: 'AI Insight Center' },
      { path: '/admin-notifications', icon: <FiBell />, label: 'Notifications' },
      { path: '/admin-roles', icon: <FiUsers />, label: 'Role Management' },
    ],
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e293b] p-6 space-y-6 min-h-screen sticky top-0 shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
        Dealcross Admin
      </h2>
      <nav className="space-y-6 text-sm text-gray-300">
        {navItems.map((group, idx) => (
          <div key={idx}>
            {group.section && (
              <h3 className="uppercase text-gray-500 text-xs px-2 mb-2">{group.section}</h3>
            )}
            <div className="space-y-1">
              {group.links.map((item) => {
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
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;