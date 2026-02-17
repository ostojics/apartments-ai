import {useMutation} from '@tanstack/react-query';

import {submitPromotionsRequest} from '@/modules/api/promotions-api';
import {analyticsService} from '@/modules/analytics/analytics.service';

export const usePromotionsMutation = () => {
  return useMutation({
    mutationFn: submitPromotionsRequest,
    onError: (error, variables, _result, _context) => {
      analyticsService.trackException(error, {
        feature: 'promotions',
        data: JSON.stringify(variables),
      });
    },
  });
};
