import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import type {BuildingSummaryDTO} from '@host-elite/contracts';

import {AspectRatio} from '@/components/ui/aspect-ratio';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';
import {useTranslation} from 'react-i18next';

interface ApartmentsListViewProps {
  apartments: BuildingSummaryDTO[];
}

export function ApartmentsListView({apartments}: ApartmentsListViewProps) {
  const navigate = useNavigate();
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);
  const {t} = useTranslation();

  const handleContinue = () => {
    if (!selectedApartmentId) {
      return;
    }

    void navigate({
      to: '/apartments/$apartmentId',
      params: {apartmentId: selectedApartmentId},
    });
  };

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
          const isSelected = selectedApartmentId === apartment.slug;

          return (
            <Card
              key={apartment.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedApartmentId(apartment.slug)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedApartmentId(apartment.slug);
                }
              }}
              className={cn(
                'group flex cursor-pointer flex-col gap-0 overflow-hidden border border-border/70 p-0 text-left transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                isSelected && 'border-primary ring-2 ring-primary/30',
              )}
            >
              <div className="w-full overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  {apartment.imageUrl ? (
                    <img
                      src={apartment.imageUrl}
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
                <h2 className="text-lg font-semibold text-foreground">{apartment.name}</h2>
                {apartment.address && <p className="text-sm text-muted-foreground">{apartment.address}</p>}
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
