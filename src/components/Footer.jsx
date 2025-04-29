// File: src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
      <p>&copy; {new Date().getFullYear()} Dealcross. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
