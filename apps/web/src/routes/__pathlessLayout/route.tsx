import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/__pathlessLayout')({
  component: RouteComponent,
  // beforeLoad: ({context}) => {
  //   if (!context.isAuthenticated) {
  //     // eslint-disable-next-line @typescript-eslint/only-throw-error
  //     throw redirect({to: '/login'});
  //   }
  // },
});

function RouteComponent() {
  return (
    <div>
      private layout
      <Outlet />
    </div>
  );
}
