import {useState} from 'react';
import type {ElementType} from 'react';
import {Link} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {GBFlag} from '@/components/icons/gb-flag';
import {RSFlag} from '@/components/icons/rs-flag';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';
import {DEFAULT_LANGUAGE, I18nLanguage, LANGUAGE_LABEL_KEYS, SUPPORTED_LANGUAGES} from '@/modules/i18n/constants/i18n';

const languageFlags: Record<I18nLanguage, ElementType> = {
  'en-US': GBFlag,
  'sr-Latn': RSFlag,
};

export function LanguageSelectionPage() {
  const {i18n, t} = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? DEFAULT_LANGUAGE) as I18nLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState<I18nLanguage>(currentLanguage);

  const handleContinue = () => {
    void i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('languageSelection.title')}</CardTitle>
          <CardDescription>{t('languageSelection.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {SUPPORTED_LANGUAGES.map((language) => {
              const Flag = languageFlags[language];
              const isSelected = selectedLanguage === language;

              return (
                <Button
                  key={language}
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    'h-auto w-full justify-start gap-4 rounded-xl px-5 py-5 text-left',
                    !isSelected && 'hover:border-primary/60',
                  )}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedLanguage(language)}
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border',
                      isSelected ? 'border-primary-foreground/40 bg-primary-foreground/15' : 'bg-muted',
                    )}
                  >
                    <Flag className="size-5" />
                  </span>
                  <span className="text-base font-semibold">{t(LANGUAGE_LABEL_KEYS[language])}</span>
                </Button>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/welcome" onClick={handleContinue}>
                {t('languageSelection.continue')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
