import {http, HttpResponse} from 'msw';
import {buildMockRoute} from '../utils/build-mock-route';
import {TenantCheckResponseDTO} from '@apartments-ai/contracts';

const mockTenantCheckResponse: TenantCheckResponseDTO = {
  data: {
    isValid: true,
    tenant: {
      id: '1',
      slug: 'demo-tenant',
      name: 'Demo Tenant',
    },
  },
};

export const tenantsHandlers = [
  http.get(buildMockRoute('/v1/tenants/check'), () => {
    return HttpResponse.json<TenantCheckResponseDTO>(mockTenantCheckResponse, {status: 200});
  }),
];
