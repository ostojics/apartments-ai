import {DEFAULT_LANGUAGE, I18N_LANGUAGE_KEY} from '../constants/i18n';

export const getCurrentLanguage = () => {
  return localStorage.getItem(I18N_LANGUAGE_KEY) ?? DEFAULT_LANGUAGE;
};
