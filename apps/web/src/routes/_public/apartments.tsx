import {createFileRoute} from '@tanstack/react-router';

import {ApartmentsPage} from '@/modules/apartments/components/apartments.page';

export const Route = createFileRoute('/_public/apartments')({
  component: ApartmentsRoute,
});

function ApartmentsRoute() {
  return <ApartmentsPage />;
}
