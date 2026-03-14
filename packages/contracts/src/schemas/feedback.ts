import {z} from 'zod/v4';

export const feedbackSubmissionSchema = z.object({
  email: z.email({message: 'feedback.errors.emailInvalid'}).optional(),
  message: z.string().trim().min(1, 'feedback.errors.messageRequired').max(1000, 'feedback.errors.messageTooLong'),
});

export type FeedbackSubmissionDTO = z.infer<typeof feedbackSubmissionSchema>;
