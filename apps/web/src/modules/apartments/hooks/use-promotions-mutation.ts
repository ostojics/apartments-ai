import {useMutation} from '@tanstack/react-query';

import {submitPromotionsRequest} from '@/modules/api/promotions-api';

export const usePromotionsMutation = () => {
  return useMutation({
    mutationFn: submitPromotionsRequest,
  });
};
