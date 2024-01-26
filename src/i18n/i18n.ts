import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/translations.en.json';
import es from './locales/translations.es.json';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
  debug: false,
  fallbackLng: 'en',
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    htmlTag: document.documentElement,
    caches: ['localStorage'],
  },
});

export { i18n };
