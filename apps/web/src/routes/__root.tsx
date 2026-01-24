import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import type {QueryClient} from '@tanstack/react-query';

export interface RouterContext {
  isAuthenticated: boolean;
  isValid?: boolean;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <section className="bg-primary-foreground w-full min-h-screen">
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </section>
  ),
});
