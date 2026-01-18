import {createFileRoute} from '@tanstack/react-router';
import {ApartmentPage} from '@/modules/apartments/components/apartment.page';

export const Route = createFileRoute('/_public/apartments/$apartmentId')({
  component: ApartmentDetailRoute,
});

function ApartmentDetailRoute() {
  return <ApartmentPage />;
}
