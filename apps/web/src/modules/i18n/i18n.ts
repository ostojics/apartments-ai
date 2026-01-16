import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(detector)
  .use(backend)
  .init({
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: import.meta.env.DEV,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('i18n initialization failed:', error);
  });

export default i18n;
