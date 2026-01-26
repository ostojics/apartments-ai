import {useTranslation} from 'react-i18next';

export function ApartmentsPageError() {
  const {t} = useTranslation();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('apartments.subtitle')}
        </p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t('apartments.title')}</h1>
        <p className="text-base text-muted-foreground">{t('apartments.description')}</p>
      </header>
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{t('apartments.errors.loadingFailed')}</p>
      </div>
    </section>
  );
}
