// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/dealcross-logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useUser } from '@/context/UserContext'; // ✅ NEW

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useUser(); // ✅ NEW

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    navigate('/login', { replace: true });
  };

  // Small helpers for nav sets
  const PublicLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
      <Link to="/deals" className="hover:text-blue-600 dark:hover:text-blue-400">Deals</Link>
      <Link to="/share-trading" className="hover:text-blue-600 dark:hover:text-blue-400">Share Trading</Link>
      <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
      <Link to="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">Docs</Link>
      <Link to="/upgrade" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold">Upgrade</Link>
    </>
  );

  return (
    <nav className={`bg-white dark:bg-gray-900 relative z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Dealcross" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dealcross</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <PublicLinks />
          {/* Signed-in user quick links */}
          {!loading && user && (
            <>
              <Link to="/wallet" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin-dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Admin</Link>
              )}
            </>
          )}
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {!loading && !user ? (
            <>
              <Link to="/login" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md">Sign Up</Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-sm rounded-md"
              >
                Logout
              </button>
            </>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden space-x-2">
          {!loading && !user ? (
            <>
              <Link to="/login" className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700">Login</Link>
              <Link to="/signup" className="px-3 py-1 text-xs bg-gray-800 text-white rounded-full hover:bg-gray-700">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/wallet" className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin-dashboard" className="px-3 py-1 text-xs bg-gray-800 text-white rounded-full hover:bg-gray-700">Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          )}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? (
              <XIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-gray-900 p-6 z-50 shadow-lg space-y-6 text-lg font-medium"
            >
              <div className="space-y-4">
                <Link to="/" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                <Link to="/deals" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Deals</Link>
                <Link to="/share-trading" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Share Trading</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
                <Link to="/docs" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Docs</Link>
                <Link to="/upgrade" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400 font-semibold">Upgrade</Link>

                {!loading && user && (
                  <>
                    <Link to="/wallet" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
                    {isAdmin && (
                      <Link to="/admin-dashboard" onClick={() => setOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Admin</Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left mt-2 px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!loading && !user && (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="block px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">Sign Up</Link>
                  </>
                )}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                  <ThemeToggle />
                </div>
                <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
```0
