import {z} from 'zod/v4';

const phoneRegex = /^[+]?[\d\s().-]{7,}$/;

export const promotionsRequestSchema = z.object({
  name: z.string().trim().min(1, 'apartment.promotions.errors.nameRequired'),
  email: z.email('apartment.promotions.errors.emailInvalid').trim().min(1, 'apartment.promotions.errors.emailRequired'),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((value) => !value || phoneRegex.test(value), {
      message: 'apartment.promotions.errors.phoneInvalid',
    }),
  preferredLanguage: z
    .string()
    .trim()
    .regex(/^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|-[0-9]{3})?$/, {
      message: 'apartment.promotions.errors.languageInvalid',
    }),
});

export type PromotionsRequestDTO = z.infer<typeof promotionsRequestSchema>;
