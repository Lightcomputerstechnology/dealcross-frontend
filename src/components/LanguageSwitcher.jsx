// src/components/LanguageSwitcher.jsx
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';

const languages = [
  { code: 'en', name: 'English', emoji: '🇺🇸' },
  { code: 'es', name: 'Español', emoji: '🇪🇸' },
  { code: 'fr', name: 'Français', emoji: '🇫🇷' },
  { code: 'de', name: 'Deutsch', emoji: '🇩🇪' },
  { code: 'zh', name: '中文', emoji: '🇨🇳' },
  { code: 'ru', name: 'Русский', emoji: '🇷🇺' },
  { code: 'ar', name: 'العربية', emoji: '🇸🇦' },
  { code: 'pt', name: 'Português', emoji: '🇧🇷' },
  { code: 'ja', name: '日本語', emoji: '🇯🇵' },
  { code: 'hi', name: 'हिन्दी', emoji: '🇮🇳' },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      const match = languages.find(l => l.code === savedLang);
      if (match) setCurrent(match);
    }
  }, []);

  const toggle = () => setOpen(!open);

  const select = (lang) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem('i18nextLng', lang.code);
    setCurrent(lang);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left font-sans">
      <button
        onClick={toggle}
        className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm transition"
      >
        <span className="text-lg">{current.emoji}</span>
        <span>{current.name}</span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className="flex w-full px-4 py-2 text-sm items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="mr-2 text-lg">{lang.emoji}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}