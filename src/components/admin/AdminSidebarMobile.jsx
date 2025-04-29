// File: src/components/AdminSidebarMobile.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiBarChart2,
  FiUsers,
  FiBriefcase,
  FiAlertCircle,
  FiPieChart,
  FiFileText,
  FiShield,
  FiSettings,
} from 'react-icons/fi';
import Logo from '@/assets/dealcross-logo.png';

const navLinks = [
  { name: "Dashboard", path: "/admin", icon: FiBarChart2 },
  { name: "Users", path: "/users", icon: FiUsers },
  { name: "Deals", path: "/deals", icon: FiBriefcase },
  { name: "Disputes", path: "/dispute-log", icon: FiAlertCircle },
  { name: "Analytics", path: "/analytics", icon: FiPieChart },
  { name: "Activity Log", path: "/deal-logs", icon: FiFileText },
  { name: "Security", path: "/security-center", icon: FiShield },
  { name: "Settings", path: "/settings", icon: FiSettings },
];

export default function AdminSidebarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-md shadow md:hidden"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e293b] text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center gap-3">
          <img src={Logo} alt="Dealcross" className="h-8 w-8" />
          <h2 className="text-lg font-bold tracking-wide">Dealcross Admin</h2>
        </div>

        <nav className="p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
            >
              <link.icon size={18} />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
