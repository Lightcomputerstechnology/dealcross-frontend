// File: src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteLayout from '@/layouts/SiteLayout';
import SignupPage from '@/pages/SignupPage'; // Or any page you’re sure works

const AppRoutes = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<SignupPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;