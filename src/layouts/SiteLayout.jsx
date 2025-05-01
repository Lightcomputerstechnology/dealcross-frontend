// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// … your other imports

const SiteLayout = () => {
  return (
    <div>
      <h1 className="text-4xl text-red-500">🔥 SITE LAYOUT LOADED 🔥</h1>
      {/* …rest of your layout */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default SiteLayout;