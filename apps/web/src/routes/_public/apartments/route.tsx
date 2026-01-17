import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_public/apartments')({
  component: ApartmentsLayoutRoute,
});

function ApartmentsLayoutRoute() {
  return <Outlet />;
}
