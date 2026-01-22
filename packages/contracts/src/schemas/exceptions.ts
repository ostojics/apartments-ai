import z from 'zod/v4';

export const exceptionResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  code: z.string(),
  message: z.string(),
  metadata: z.any(),
  path: z.string(),
  timestamp: z.string(),
});

export type ExceptionResponse = z.infer<typeof exceptionResponseSchema>;
