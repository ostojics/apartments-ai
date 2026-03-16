import {z} from 'zod/v4';

// Promotion submission endpoint
export const promotionSubmissionSchema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  phoneNumber: z.string('Invalid phone number').optional().nullable(),
  preferredLanguage: z.string().min(1, 'Preferred language is required'),
});

export type PromotionSubmissionDTO = z.infer<typeof promotionSubmissionSchema>;
