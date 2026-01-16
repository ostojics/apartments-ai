import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {DEFAULT_LANGUAGE, I18nLanguage, SUPPORTED_LANGUAGES} from '@/common/constants/i18n';

const LANGUAGE_LABELS: Record<I18nLanguage, string> = {
  'en-US': 'English',
  'sr-Latn': 'Srpski',
};

export function LanguageSelect() {
  const {i18n} = useTranslation();

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((language) => language === i18n.resolvedLanguage || language === i18n.language) ??
    DEFAULT_LANGUAGE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {LANGUAGE_LABELS[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem key={language} onClick={() => i18n.changeLanguage(language)}>
            {LANGUAGE_LABELS[language]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
