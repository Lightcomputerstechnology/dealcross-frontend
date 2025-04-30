// File: src/layouts/AdminLayout.jsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarDesktop from '@/components/admin/AdminSidebar';
import MobileAdminSidebar from '@/components/admin/AdminSidebarMobile';
import { FiMenu } from 'react-icons/fi';

export default function AdminLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-[#1e293b] border-r border-gray-700">
        <SidebarDesktop />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowMobileMenu(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow"
      >
        <FiMenu size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="w-64 bg-[#1e293b] h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <MobileAdminSidebar closeMenu={() => setShowMobileMenu(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 z-10">
        <Outlet />
      </main>
    </div>
  );
}
