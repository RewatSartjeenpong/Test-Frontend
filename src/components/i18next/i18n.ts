import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../components/i18next/en.json';
import translationFR from '../../components/i18next/th.json';


const resources = {
  en: { translation: translationEN },
  th: { translation: translationFR },
 
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
