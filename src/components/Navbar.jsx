// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next'; // ✅ i18n hook
import Logo from '../assets/dealcross-logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation(); // ✅ i18n init
  const { user, wallet, kycStatus, notifications, logout } = useUser();

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
          <img src={Logo} alt="Dealcross" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dealcross</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">{t('home')}</Link>
          <Link to="/deals" className="hover:text-blue-600 dark:hover:text-blue-400">{t('deals')}</Link>
          <Link to="/share-trading" className="hover:text-blue-600 dark:hover:text-blue-400">{t('share_trading')}</Link>
          <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">{t('contact')}</Link>
          <Link to="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">{t('docs')}</Link>
          <Link to="/upgrade" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold">{t('upgrade')}</Link>
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
                <span>{user.username}</span>
                {wallet && <span className="text-green-500 font-bold">${wallet.balance}</span>}
                {kycStatus && <span className="text-xs bg-blue-500 text-white px-2 rounded">{kycStatus}</span>}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg hidden group-hover:block z-50">
                <Link to="/notifications" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {t('notifications')} ({notifications?.length || 0})
                </Link>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 text-red-600 dark:text-white">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}>
            {open ? <XIcon className="h-6 w-6 text-gray-900 dark:text-white" /> : <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                <Link to="/" onClick={() => setOpen(false)}>{t('home')}</Link>
                <Link to="/deals" onClick={() => setOpen(false)}>{t('deals')}</Link>
                <Link to="/share-trading" onClick={() => setOpen(false)}>{t('share_trading')}</Link>
                <Link to="/contact" onClick={() => setOpen(false)}>{t('contact')}</Link>
                <Link to="/docs" onClick={() => setOpen(false)}>{t('docs')}</Link>
                <Link to="/upgrade" onClick={() => setOpen(false)} className="font-semibold">{t('upgrade')}</Link>
              </div>

              <div className="border-t pt-4 space-y-4">
                {user ? (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    <p className="text-xs text-blue-500">KYC: {kycStatus}</p>
                    <p className="text-xs">Wallet: ${wallet?.balance}</p>
                    <Link to="/notifications">{t('notifications')} ({notifications?.length})</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 dark:text-white hover:bg-red-100 dark:hover:bg-red-600">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 rounded bg-blue-600 text-white">Login</Link>
                    <Link to="/signup" className="block px-4 py-2 rounded bg-gray-800 text-white">Sign Up</Link>
                  </>
                )}
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}