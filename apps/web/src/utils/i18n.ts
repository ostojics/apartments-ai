import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

import {DEFAULT_LANGUAGE, I18N_LANGUAGE_KEY, SUPPORTED_LANGUAGES} from '@/common/constants/i18n';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: I18N_LANGUAGE_KEY,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })
  .catch(() => undefined);

export default i18n;
