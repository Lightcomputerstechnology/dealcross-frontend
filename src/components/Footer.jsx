// File: src/components/Footer.jsx

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n hook

const Footer = () => {
  const { t } = useTranslation(); // ✅ Init translation

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-center text-center md:text-left">

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-gray-500 hover:text-blue-600 transition-transform duration-200 transform hover:scale-110" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-gray-500 hover:text-blue-400 transition-transform duration-200 transform hover:scale-110" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-gray-500 hover:text-pink-500 transition-transform duration-200 transform hover:scale-110" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-gray-500 hover:text-blue-700 transition-transform duration-200 transform hover:scale-110" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/about" className="hover:underline transition-colors duration-200">{t('about')}</Link>
          <Link to="/contact" className="hover:underline transition-colors duration-200">{t('contact')}</Link>
          <Link to="/privacy-policy" className="hover:underline transition-colors duration-200">{t('privacy_policy')}</Link>
          <Link to="/docs" className="hover:underline transition-colors duration-200">{t('docs')}</Link>
          <Link to="/faq" className="hover:underline transition-colors duration-200">{t('faq')}</Link>
          <Link to="/blog" className="hover:underline transition-colors duration-200">{t('blog')}</Link>
          <Link to="/referral" className="hover:underline transition-colors duration-200">{t('referral')}</Link>
          <Link to="/terms" className="hover:underline transition-colors duration-200">{t('terms')}</Link>
          <Link to="/refund-policy" className="hover:underline transition-colors duration-200">{t('refund_policy')}</Link>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} Dealcross. {t('all_rights_reserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
