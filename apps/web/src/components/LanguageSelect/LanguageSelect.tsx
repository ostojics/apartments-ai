import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {DEFAULT_LANGUAGE, I18nLanguage, SUPPORTED_LANGUAGES} from '@/common/constants/i18n';

const LANGUAGE_LABEL_KEYS: Record<I18nLanguage, string> = {
  'en-US': 'language.english',
  'sr-Latn': 'language.serbian',
};

export function LanguageSelect() {
  const {i18n, t} = useTranslation();

  const currentLanguage = (i18n.resolvedLanguage ?? DEFAULT_LANGUAGE) as I18nLanguage;

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
