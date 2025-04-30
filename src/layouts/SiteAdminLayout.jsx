import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';

const SiteAdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 bg-[#0f172a]">
        <Outlet />
      </main>
    </div>
  );
};

export default SiteAdminLayout;