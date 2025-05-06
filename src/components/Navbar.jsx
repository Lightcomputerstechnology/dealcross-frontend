// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/dealcross-logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ───── Sticky shadow on scroll ───── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─────────────────────────────────── */
  return (
    <nav
      className={`bg-white dark:bg-gray-900 transition-colors duration-300 shadow-sm relative z-50 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Dealcross" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dealcross</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {[
            ['/', 'Home'],
            ['/deals', 'Deals'],
            ['/share-trading', 'Share Trading'],
            ['/contact', 'Contact'],
            ['/docs', 'Docs'],
            ['/upgrade', 'Upgrade'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                label === 'Upgrade' ? 'font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/login"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white hover:text-white dark:text-white text-sm rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white hover:text-white dark:text-white text-sm rounded-md transition"
          >
            Sign Up
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center md:hidden space-x-2">
          <Link
            to="/login"
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white hover:text-white dark:text-white rounded-full transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-white hover:text-white dark:text-white rounded-full transition"
          >
            Sign Up
          </Link>
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <XIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* ─────────  Mobile Drawer (flash‑proof & theme‑aware)  ───────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay — opaque, no blur, prevents flash */}
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              /* 🌗 theme‑aware classes decided at render */
              className={`fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-2xl shadow-lg space-y-6
                text-lg font-medium ${
                  document.documentElement.classList.contains('dark')
                    ? 'bg-gray-950 text-white'
                    : 'bg-white text-gray-900'
                }`}
            >
              <div className="space-y-4">
                {[
                  ['/', 'Home'],
                  ['/deals', 'Deals'],
                  ['/share-trading', 'Share Trading'],
                  ['/contact', 'Contact'],
                  ['/docs', 'Docs'],
                  ['/upgrade', 'Upgrade'],
                ].map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div
                className={`border-t pt-4 space-y-4 ${
                  document.documentElement.classList.contains('dark')
                    ? 'border-gray-700'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Theme</span>
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