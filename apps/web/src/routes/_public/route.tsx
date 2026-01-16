import {PublicLayout} from '@/layouts/public-layout';
import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: PublicLayoutRoute,
});

function PublicLayoutRoute() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
