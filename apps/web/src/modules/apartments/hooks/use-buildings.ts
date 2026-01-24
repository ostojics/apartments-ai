import {useQuery} from '@tanstack/react-query';

import {getBuildings} from '@/modules/api/buildings-api';
import {queryKeys} from '@/modules/api/query-keys';

export const useBuildings = () => {
  return useQuery({
    queryKey: queryKeys.buildings(),
    queryFn: getBuildings,
  });
};
