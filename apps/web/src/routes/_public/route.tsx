import {PublicLayout} from '@/layouts/public-layout';
import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: PublicLayoutRoute,
  beforeLoad: ({context}) => {
    if (context.isValid === false) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: '/invalid',
      });
    }
  },
});

function PublicLayoutRoute() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
