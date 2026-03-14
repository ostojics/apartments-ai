import {useMutation} from '@tanstack/react-query';

import {submitFeedback} from '@/modules/api/feedback-api';
import {analyticsService} from '@/modules/analytics/analytics.service';

export const useFeedbackMutation = () => {
  return useMutation({
    mutationFn: submitFeedback,
    onError: (error, variables) => {
      analyticsService.trackException(error, {
        feature: 'feedback',
        data: JSON.stringify(variables),
      });
    },
  });
};
