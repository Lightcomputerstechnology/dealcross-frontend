// File: src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteLayout from '@/layouts/SiteLayout';
import SignupPage from '@/pages/SignupPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}