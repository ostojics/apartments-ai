import type {FeedbackSubmissionDTO} from '@host-elite/contracts';
import {feedbackSubmissionSchema} from '@host-elite/contracts';
import {useForm} from 'react-hook-form';

import {createZodResolver} from '@/lib/utils/zod-resolver';

export const useFeedbackForm = () => {
  return useForm<FeedbackSubmissionDTO>({
    resolver: createZodResolver<FeedbackSubmissionDTO>(feedbackSubmissionSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });
};
