import {createFileRoute} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {Card, CardContent} from '@/components/ui/card';

export const Route = createFileRoute('/_public/apartments/$apartmentId')({
  component: ApartmentDetailRoute,
});

function ApartmentDetailRoute() {
  const {apartmentId} = Route.useParams();
  const {t} = useTranslation();

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('apartments.detailSubtitle')}
        </p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t('apartments.detailTitle')}</h1>
      </header>
      <Card className="p-0">
        <CardContent className="flex flex-col gap-2 py-6 text-base text-muted-foreground">
          {t('apartments.detailDescription', {id: apartmentId})}
        </CardContent>
      </Card>
    </section>
  );
}
