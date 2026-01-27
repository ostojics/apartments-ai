import {useQuery} from '@tanstack/react-query';

import {getBuildingInfo} from '@/modules/api/buildings-api';
import {queryKeys} from '@/modules/api/query-keys';
import {getCurrentLanguage} from '@/modules/i18n/utils/get-current-language';

export const useBuildingInfo = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.buildingInfo(slug, getCurrentLanguage()),
    queryFn: () => getBuildingInfo(slug),
  });
};
