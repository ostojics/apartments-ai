import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {useBuildings} from '@/modules/apartments/hooks/use-buildings';
import {ApartmentsListView} from './apartments-list-view';

export function ApartmentsPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {data: buildingsData, isLoading, isSuccess} = useBuildings();

  const handleContinue = () => {
    if (!selectedApartmentId) {
      return;
    }

    void navigate({
      to: '/apartments/$apartmentId',
      params: {apartmentId: selectedApartmentId},
    });
  };

  if (isLoading) {
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
          <p className="text-muted-foreground">{t('common.loading', 'Loading...')}</p>
        </div>
      </section>
    );
  }

  if (!isSuccess) {
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
          <p className="text-destructive">{t('common.error', 'Failed to load buildings. Please try again.')}</p>
        </div>
      </section>
    );
  }

  // Type narrowing with isSuccess: at this point buildingsData is guaranteed to be defined
  // TypeScript's type narrowing with isSuccess doesn't fully work here, so we explicitly type the data
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const apartments = buildingsData.data;

  return (
    <ApartmentsListView
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      apartments={apartments}
      selectedApartmentId={selectedApartmentId}
      setSelectedApartmentId={setSelectedApartmentId}
      handleContinue={handleContinue}
      t={t}
      navigate={navigate}
    />
  );
}
