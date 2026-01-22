import {z} from 'zod/v4';

// Building information endpoint
export const buildingInformationResponseSchema = z.object({
  data: z.object({
    content: z.string(),
  }),
});

export type BuildingInformationResponseDTO = z.infer<typeof buildingInformationResponseSchema>;
