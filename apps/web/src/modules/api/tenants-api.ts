import type {TenantCheckResponseDTO} from '@host-elite/contracts';
import httpClient from './http-client';

export const checkTenant = () => {
  return httpClient.get('v1/tenants/check').json<TenantCheckResponseDTO>();
};
