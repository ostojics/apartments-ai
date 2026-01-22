import {z} from 'zod/v4';

// Promotion submission endpoint
export const promotionSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional().nullable(),
  preferredLanguage: z.string().min(1, 'Preferred language is required'),
});

export type PromotionSubmissionDTO = z.infer<typeof promotionSubmissionSchema>;
