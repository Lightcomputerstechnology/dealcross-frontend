// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const SiteLayout = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-blue-600 text-center">SITE LAYOUT LOADED</h1>
      <main className="mt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SiteLayout;