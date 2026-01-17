import {z} from 'zod/v4';

const phoneRegex = /^[+]?[\d\s().-]{7,}$/;

export const promotionsRequestSchema = z.object({
  name: z.string().trim().min(1, 'apartment.promotions.errors.nameRequired'),
  email: z
    .string()
    .trim()
    .min(1, 'apartment.promotions.errors.emailRequired')
    .email('apartment.promotions.errors.emailInvalid'),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((value) => !value || phoneRegex.test(value), {
      message: 'apartment.promotions.errors.phoneInvalid',
    }),
});

export type PromotionsRequestDTO = z.infer<typeof promotionsRequestSchema>;
