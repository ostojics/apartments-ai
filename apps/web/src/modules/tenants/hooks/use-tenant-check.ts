import {useQuery} from '@tanstack/react-query';
import {checkTenant} from '@/modules/api/tenants-api';
import {queryKeys} from '@/modules/api/query-keys';

export const useTenantCheck = () => {
  return useQuery({
    queryKey: queryKeys.tenantCheck(),
    queryFn: checkTenant,
  });
};
