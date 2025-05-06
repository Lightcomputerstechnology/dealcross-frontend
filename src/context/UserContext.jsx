// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon, Bell, LogOut, User as UserIcon, CreditCard } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/dealcross-logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, wallet, kycStatus, notifications, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
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
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="/deals" className="hover:text-blue-600 dark:hover:text-blue-400">Deals</Link>
          <Link to="/share-trading" className="hover:text-blue-600 dark:hover:text-blue-400">Share Trading</Link>
          <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
          <Link to="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">Docs</Link>
          <Link to="/upgrade" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold">Upgrade</Link>
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md">Sign Up</Link>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-sm font-medium text-white bg-blue-600 px-3 py-1.5 rounded-md">
                <UserIcon className="h-4 w-4" />
                <span>{user.username}</span>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg p-4 space-y-2 opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                <div className="text-sm text-gray-900 dark:text-white font-semibold">{user.full_name}</div>
                <div className="text-xs text-gray-500">KYC: <span className="font-medium">{kycStatus}</span></div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Balance</span>
                  <span className="text-blue-600 font-bold">${wallet?.balance?.toFixed(2)}</span>
                </div>
                <Link to="/notifications" className="flex items-center text-sm text-blue-600 hover:underline">
                  <Bell className="h-4 w-4 mr-1" /> {notifications.length} Notifications
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden space-x-2">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700">Login</Link>
              <Link to="/signup" className="px-3 py-1 text-xs bg-gray-800 text-white rounded-full hover:bg-gray-700">Sign Up</Link>
            </>
          ) : null}
          <button onClick={() => setOpen(!open)}>
            {open ? <XIcon className="h-6 w-6 text-gray-900 dark:text-white" /> : <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />}
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
              </div>
              <div className="border-t pt-4 space-y-4">
                {user && (
                  <div className="text-sm space-y-2">
                    <div className="text-white font-medium">{user.username}</div>
                    <div className="text-gray-400 text-xs">KYC: {kycStatus}</div>
                    <div className="text-blue-500 text-sm">Balance: ${wallet?.balance?.toFixed(2)}</div>
                    <Link to="/notifications" className="text-blue-400 text-sm flex items-center gap-2">
                      <Bell className="h-4 w-4" /> Notifications
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        navigate('/');
                      }}
                      className="text-red-500 text-sm flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
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
                  
