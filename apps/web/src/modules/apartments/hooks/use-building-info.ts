import {useQuery} from '@tanstack/react-query';

import {getBuildingInfo} from '@/modules/api/buildings-api';
import {queryKeys} from '@/modules/api/query-keys';

export const useBuildingInfo = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.buildingInfo(slug),
    queryFn: () => getBuildingInfo(slug),
  });
};
