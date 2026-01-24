import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {queryKeys} from '@/modules/api/query-keys';
import {checkTenant} from '@/modules/api/tenants-api';

export const Route = createFileRoute('/_public/apartments')({
  beforeLoad: async ({context}) => {
    // Check if tenant validation is required
    if (context.isValid === false) {
      throw redirect({
        to: '/',
        search: {
          error: 'invalid-tenant',
        },
      });
    }
  },
  loader: async ({context: {queryClient}}) => {
    // Fetch tenant check data
    const tenantData = await queryClient.ensureQueryData({
      queryKey: queryKeys.tenantCheck(),
      queryFn: checkTenant,
      staleTime: 5 * 60 * 1000,
    });

    // If tenant is not valid, this will be caught by beforeLoad on next navigation
    return {
      isValid: tenantData.data.isValid,
      tenant: tenantData.data.tenant,
    };
  },
  component: ApartmentsLayoutRoute,
});

function ApartmentsLayoutRoute() {
  return <Outlet />;
}
