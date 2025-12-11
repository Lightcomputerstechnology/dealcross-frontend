// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav
      className={`sticky top-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Dealcross
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/deals">Deals</Link>
            <Link className="nav-link" to="/share-trading">Share Trading</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
            <Link className="nav-link" to="/docs">Docs</Link>

            <Link
              to="/upgrade"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition font-semibold"
            >
              Upgrade
            </Link>

            {/* Signed-in links */}
            {!loading && user && (
              <>
                <Link className="nav-link" to="/wallet">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link className="nav-link" to="/admin-dashboard">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* DESKTOP RIGHT CONTROLS */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {!loading && !user ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-outline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-muted">
                Logout
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto z-50"
            >
              <div className="p-6 space-y-6">
                {/* Mobile HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold dark:text-white">
                      Dealcross
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Mobile links */}
                <div className="space-y-4">
                  <Link onClick={() => setMobileMenuOpen(false)} to="/" className="mobile-link">
                    Home
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/deals" className="mobile-link">
                    Deals
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/share-trading" className="mobile-link">
                    Share Trading
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/contact" className="mobile-link">
                    Contact
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/docs" className="mobile-link">
                    Docs
                  </Link>

                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/upgrade"
                    className="text-blue-500 font-medium block"
                  >
                    Upgrade
                  </Link>

                  {!loading && user && (
                    <>
                      <Link onClick={() => setMobileMenuOpen(false)} to="/wallet" className="mobile-link">
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link onClick={() => setMobileMenuOpen(false)} to="/admin-dashboard" className="mobile-link">
                          Admin
                        </Link>
                      )}
                    </>
                  )}
                </div>

                {/* Auth buttons */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  {!loading && !user ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/login');
                          setMobileMenuOpen(false);
                        }}
                        className="btn-primary w-full mb-3"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate('/signup');
                          setMobileMenuOpen(false);
                        }}
                        className="btn-outline w-full"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="btn-muted w-full">
                      Logout
                    </button>
                  )}
                </div>

                {/* Settings */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Theme</span>
                    <ThemeToggle />
                  </div>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}