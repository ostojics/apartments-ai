import {zodResolver} from '@hookform/resolvers/zod';
import type {FieldValues, Resolver} from 'react-hook-form';

export const createZodResolver = <TFieldValues extends FieldValues>(schema: unknown): Resolver<TFieldValues> => {
  return zodResolver(schema as Parameters<typeof zodResolver>[0]) as unknown as Resolver<TFieldValues>;
};
