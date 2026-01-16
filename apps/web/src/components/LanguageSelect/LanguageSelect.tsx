import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {DEFAULT_LANGUAGE, I18nLanguage, SUPPORTED_LANGUAGES} from '@/common/constants/i18n';

const LANGUAGE_LABEL_KEYS: Record<I18nLanguage, string> = {
  'en-US': 'language.english',
  'sr-Latn': 'language.serbian',
};

const isSupportedLanguage = (language: string): language is I18nLanguage =>
  SUPPORTED_LANGUAGES.includes(language as I18nLanguage);

export function LanguageSelect() {
  const {i18n, t} = useTranslation();

  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language;
  const currentLanguage = isSupportedLanguage(resolvedLanguage) ? resolvedLanguage : DEFAULT_LANGUAGE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Select language">
          {t(LANGUAGE_LABEL_KEYS[currentLanguage])}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem key={language} onClick={() => i18n.changeLanguage(language)}>
            {t(LANGUAGE_LABEL_KEYS[language])}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
