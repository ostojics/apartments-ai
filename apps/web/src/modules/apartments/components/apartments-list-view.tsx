import {useEffect} from 'react';
import type {useNavigate} from '@tanstack/react-router';
import type {TFunction} from 'i18next';
import type {BuildingSummaryDTO} from '@acme/contracts';

import {AspectRatio} from '@/components/ui/aspect-ratio';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';

interface ApartmentsListViewProps {
  apartments: BuildingSummaryDTO[];
  selectedApartmentId: string | null;
  setSelectedApartmentId: (id: string | null) => void;
  handleContinue: () => void;
  t: TFunction;
  navigate: ReturnType<typeof useNavigate>;
}

export function ApartmentsListView({
  apartments,
  selectedApartmentId,
  setSelectedApartmentId,
  handleContinue,
  t,
  navigate,
}: ApartmentsListViewProps) {
  useEffect(() => {
    if (apartments.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const singleApartment = apartments[0];
      if (singleApartment) {
        void navigate({
          to: '/apartments/$apartmentId',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          params: {apartmentId: singleApartment.id},
          replace: true,
        });
      }
    }
  }, [apartments, navigate]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('apartments.subtitle')}
        </p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t('apartments.title')}</h1>
        <p className="text-base text-muted-foreground">{t('apartments.description')}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {apartments.map((apartment) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const isSelected = selectedApartmentId === apartment.id;

          return (
            <Card
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              key={apartment.id}
              role="button"
              tabIndex={0}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              onClick={() => setSelectedApartmentId(apartment.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                  setSelectedApartmentId(apartment.id);
                }
              }}
              className={cn(
                'group flex cursor-pointer flex-col gap-0 overflow-hidden border border-border/70 p-0 text-left transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                isSelected && 'border-primary ring-2 ring-primary/30',
              )}
            >
              <div className="w-full overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  {apartment.imageUrl ? (
                    <img
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      src={apartment.imageUrl}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      alt={apartment.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                      {t('apartments.imagePlaceholder')}
                    </div>
                  )}
                </AspectRatio>
              </div>
              <div className="flex flex-col gap-2 px-5 py-4">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                <h2 className="text-lg font-semibold text-foreground">{apartment.name}</h2>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {apartment.address && (
                  <p className="text-sm text-muted-foreground">
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    {apartment.address}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3 mt-4">
        <Button size="lg" disabled={!selectedApartmentId} onClick={handleContinue}>
          {t('apartments.continue')}
        </Button>
        <p className="text-sm text-muted-foreground">{t('apartments.helper')}</p>
      </div>
    </section>
  );
}
