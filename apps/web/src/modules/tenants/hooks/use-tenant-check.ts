import {useQuery} from '@tanstack/react-query';
import {checkTenant} from '@/modules/api/tenants-api';
import {queryKeys} from '@/modules/api/query-keys';

export const useTenantCheck = () => {
  return useQuery({
    queryKey: queryKeys.tenantCheck(),
    queryFn: checkTenant,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
