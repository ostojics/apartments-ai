import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {AspectRatio} from '@/components/ui/aspect-ratio';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';

interface ApartmentSummary {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
}

const APARTMENT_PLACEHOLDER_TEXT_KEY = 'apartments.imagePlaceholder';

const apartments: ApartmentSummary[] = [
  {
    id: 'north-point',
    name: 'North Point Residences',
    address: '123 Harbor Lane, Seattle, WA',
    imageUrl: 'https://placehold.co/640x360?text=North+Point',
  },
  {
    id: 'garden-view',
    name: 'Garden View Lofts',
    address: '456 Meadow Avenue, Portland, OR',
    imageUrl: 'https://placehold.co/640x360?text=Garden+View',
  },
  {
    id: 'skyline-heights',
    name: 'Skyline Heights',
    address: '789 Skyline Blvd, San Francisco, CA',
  },
];

const buildApartmentPath = (apartmentId: string) => `/apartments/${apartmentId}`;

export function ApartmentsPage() {
  const {t} = useTranslation();
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);

  const availableApartments = useMemo(() => apartments, []);

  useEffect(() => {
    const [singleApartment] = availableApartments;

    if (availableApartments.length === 1 && singleApartment) {
      window.location.assign(buildApartmentPath(singleApartment.id));
    }
  }, [availableApartments]);

  const handleContinue = () => {
    if (!selectedApartmentId) {
      return;
    }

    window.location.assign(buildApartmentPath(selectedApartmentId));
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
        {availableApartments.map((apartment) => {
          const isSelected = selectedApartmentId === apartment.id;

          return (
            <Card
              key={apartment.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedApartmentId(apartment.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
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
                  {apartment.imageUrl ? (
                    <img
                      src={apartment.imageUrl}
                      alt={apartment.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                      {t(APARTMENT_PLACEHOLDER_TEXT_KEY)}
                    </div>
                  )}
                </AspectRatio>
              </div>
              <div className="flex flex-col gap-2 px-5 py-4">
                <h2 className="text-lg font-semibold text-foreground">{apartment.name}</h2>
                <p className="text-sm text-muted-foreground">{apartment.address}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button size="lg" disabled={!selectedApartmentId} onClick={handleContinue}>
          {t('apartments.continue')}
        </Button>
        <p className="text-sm text-muted-foreground">{t('apartments.helper')}</p>
      </div>
    </section>
  );
}
