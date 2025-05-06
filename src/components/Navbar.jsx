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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white dark:bg-gray-900 relative z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Dealcross Logo" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dealcross</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {['/', '/deals', '/share-trading', '/contact', '/docs', '/upgrade'].map((path, idx) => (
            <Link
              key={idx}
              to={path}
              className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                path === '/upgrade' ? 'font-semibold' : ''
              }`}
            >
              {path === '/'
                ? 'Home'
                : path === '/share-trading'
                ? 'Share Trading'
                : path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">
            Login
          </Link>
          <Link to="/signup" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md">
            Sign Up
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center md:hidden space-x-2">
          <Link to="/login" className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="px-3 py-1 text-xs bg-gray-800 text-white rounded-full hover:bg-gray-700">
            Sign Up
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
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
            ></motion.div>

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-gray-900 p-6 z-50 shadow-lg space-y-6 text-lg font-medium"
            >
              <div className="space-y-4">
                {['/', '/deals', '/share-trading', '/contact', '/docs', '/upgrade'].map((path, idx) => (
                  <Link
                    key={idx}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`block hover:text-blue-600 dark:hover:text-blue-400 ${
                      path === '/upgrade' ? 'font-semibold' : ''
                    }`}
                  >
                    {path === '/'
                      ? 'Home'
                      : path === '/share-trading'
                      ? 'Share Trading'
                      : path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </Link>
                ))}
              </div>

              {/* Footer Controls */}
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
