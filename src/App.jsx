// File: src/App.jsx
import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <HelmetProvider>
      <AppRoutes />
      <Toaster position="top-right" />
    </HelmetProvider>
  );
}

export default App;
