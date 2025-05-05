jsx
// File: src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon } from 'react-feather';
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
    <nav className={`bg-white dark:bg-gray-950 relative z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>  
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Dealcross" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dealcross</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {['Home', 'Deals', 'Share Trading', 'Contact', 'Docs'].map((item, idx) => {
            const to = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`;
            return (
              <Link
                key={idx}
                to={to}
                className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {item}
              </Link>
            );
          })}
          <Link to="/upgrade" className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
            Upgrade
          </Link>
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/login"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition"
          >
            Sign Up
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden space-x-2">
          <Link
            to="/login"
            className="px-3 py-1 text-xs bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 text-xs bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
          <button onClick={() => setOpen(!open)}>
            {open ? <XIcon className="h-6 w-6 text-gray-900 dark:text-white" /> : <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />}            
          </button>
        </div>
      </div>

      {/* Mobile Sidebar & Backdrop (always mounted) */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Panel */}
          <div
            className={`fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white z-50 p-6 font-medium transform transition-transform duration-300 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="space-y-4">
              {['Home', 'Deals', 'Share Trading', 'Contact', 'Docs'].map((item, idx) => {
                const to = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`;
                return (
                  <Link
                    key={idx}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="block hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {item}
                  </Link>
                );
              })}
              <Link
                to="/upgrade"
                onClick={() => setOpen(false)}
                className="block font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Upgrade
              </Link>
            </div>

            {/* Divider & Controls */}
            <div className="border-t pt-4 mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                <ThemeToggle />
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
```
