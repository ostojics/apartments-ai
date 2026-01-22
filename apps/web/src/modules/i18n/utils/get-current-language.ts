import {DEFAULT_LANGUAGE} from '../constants/i18n';
import i18n from '../i18n';

export const getCurrentLanguage = () => {
  return i18n.resolvedLanguage ?? DEFAULT_LANGUAGE;
};
