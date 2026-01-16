import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {DEFAULT_LANGUAGE, I18nLanguage, LANGUAGE_LABEL_KEYS, SUPPORTED_LANGUAGES} from '@/modules/i18n/constants/i18n';
import {useTranslation} from 'react-i18next';
import {GBFlag} from '../icons/gb-flag';
import {RSFlag} from '../icons/rs-flag';

const countryFlags: Record<I18nLanguage, React.ElementType> = {
  'en-US': GBFlag,
  'sr-Latn': RSFlag,
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
        {SUPPORTED_LANGUAGES.map((language) => {
          const FlagComponent = countryFlags[language];

          return (
            <DropdownMenuItem key={language} onClick={() => i18n.changeLanguage(language)}>
              <span>
                <FlagComponent />
              </span>
              {t(LANGUAGE_LABEL_KEYS[language])}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
