import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en/en.json';
import frTranslation from './locales/fr/fr.json';
import arTranslation from './locales/ar/ar.json'; // Arabic translation

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      ar: { translation: arTranslation }, // Add Arabic language
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Optionally add for better performance
    },
  });

// Listen for language changes to update page direction
i18n.on('languageChanged', (lng) => {
  const htmlElement = document.documentElement;
  if (lng === 'ar') {
    htmlElement.setAttribute('dir', 'rtl'); // Set right-to-left direction for Arabic
  } else {
    htmlElement.setAttribute('dir', 'ltr'); // Set left-to-right direction for other languages
  }
});

export default i18n;
