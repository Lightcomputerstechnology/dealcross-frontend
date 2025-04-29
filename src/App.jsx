// File: src/App.jsx
import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </HelmetProvider>
  );
}

export default App;
