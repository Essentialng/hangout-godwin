// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import translationEN from './locales/en/translation.json';
// import translationFR from './locales/fr/translation.json';

// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   fr: {
//     translation: translationFR,
//   },
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import es from './locales/es/translation.json';
import de from './locales/de/translation.json';

i18n
  .use(LanguageDetector) // auto-detect
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], 
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

