// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language JSONs
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import es from './locales/es/translation.json';
import de from './locales/de/translation.json';
import zh from './locales/zh/translation.json';
import ru from './locales/ru/translation.json';
import ar from './locales/ar/translation.json';
import pt from './locales/pt/translation.json';
import ja from './locales/ja/translation.json';
import hi from './locales/hi/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      zh: { translation: zh },
      ru: { translation: ru },
      ar: { translation: ar },
      pt: { translation: pt },
      ja: { translation: ja },
      hi: { translation: hi },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;