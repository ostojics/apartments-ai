export const SUPPORTED_LANGUAGES = ['en-US', 'sr-Latn'] as const;

export type I18nLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABEL_KEYS: Record<I18nLanguage, string> = {
  'en-US': 'English',
  'sr-Latn': 'Srpski',
};

export const DEFAULT_LANGUAGE: I18nLanguage = 'en-US';

export const I18N_LANGUAGE_KEY = 'i18nextLng';
