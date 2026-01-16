import {createFileRoute} from '@tanstack/react-router';

import {ApartmentPage} from '@/modules/apartments/components/apartment.page';

export const Route = createFileRoute('/_public/apartments/$id')({
  component: ApartmentRoute,
});

function ApartmentRoute() {
  const apartmentId = Route.useParams({select: (params) => params.id});

  return <ApartmentPage apartmentId={apartmentId} />;
}
