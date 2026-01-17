import type {ElementType} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {GBFlag} from '@/components/icons/gb-flag';
import {RSFlag} from '@/components/icons/rs-flag';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';
import {DEFAULT_LANGUAGE, I18nLanguage, LANGUAGE_LABEL_KEYS, SUPPORTED_LANGUAGES} from '@/modules/i18n/constants/i18n';
import {toast} from 'sonner';

const languageFlags: Record<I18nLanguage, ElementType> = {
  'en-US': GBFlag,
  'sr-Latn': RSFlag,
};

export function LanguageSelectionPage() {
  const {i18n, t} = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? DEFAULT_LANGUAGE) as I18nLanguage;

  const navigate = useNavigate();

  const handleSelectLanguage = async (language: I18nLanguage) => {
    try {
      await i18n.changeLanguage(language);
    } catch {
      toast.error(t('languageSelection.errors.selectionFailed'));
    }
  };

  const handleContinue = async () => {
    await navigate({to: '/apartments'});
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
              const isSelected = currentLanguage === language;

              return (
                <Button
                  key={language}
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    'h-auto w-full justify-start gap-4 rounded-xl px-5 py-5 text-left cursor-pointer',
                    !isSelected && 'hover:border-primary/60',
                  )}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectLanguage(language)}
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border',
                      isSelected ? 'border-primary-foreground/40 bg-primary-foreground/15' : 'bg-muted',
                    )}
                  >
                    <Flag className="size-5" />
                  </span>
                  <span className="text-base font-semibold">{LANGUAGE_LABEL_KEYS[language]}</span>
                </Button>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleContinue}>
              {t('languageSelection.continue')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
