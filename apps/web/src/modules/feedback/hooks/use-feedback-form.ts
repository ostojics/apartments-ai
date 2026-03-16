import type {FeedbackSubmissionDTO} from '@host-elite/contracts';
import {feedbackSubmissionSchema} from '@host-elite/contracts';
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

export const useFeedbackForm = () => {
  return useForm<FeedbackSubmissionDTO>({
    resolver: zodResolver(feedbackSubmissionSchema),
    defaultValues: {
      message: '',
    },
  });
};
