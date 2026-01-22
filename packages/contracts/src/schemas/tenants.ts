import {z} from 'zod/v4';

// Tenant check endpoint
export const tenantCheckResponseSchema = z.object({
  data: z.object({
    isValid: z.boolean(),
    tenant: z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
    }),
  }),
});

export type TenantCheckResponseDTO = z.infer<typeof tenantCheckResponseSchema>;

// Buildings list endpoint
export const buildingSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  tenantId: z.string(),
  imageUrl: z.string().nullable(),
  address: z.string().nullable(),
});

export const buildingsResponseSchema = z.object({
  data: z.array(buildingSummarySchema),
});

export type BuildingSummaryDTO = z.infer<typeof buildingSummarySchema>;
export type BuildingsResponseDTO = z.infer<typeof buildingsResponseSchema>;
