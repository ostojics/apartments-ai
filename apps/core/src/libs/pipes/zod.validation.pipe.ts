import {Injectable, PipeTransform, ArgumentMetadata} from '@nestjs/common';
import {ZodErrorEntry, ZodException} from '../exceptions/zod.exception';
import {ZodType} from 'zod/v4';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: Record<string, unknown>, _metadata: ArgumentMetadata) {
    if (_metadata.type !== 'body' && _metadata.type !== 'query') {
      return value;
    }

    const result = this.schema.safeParse(value);

    if (!result.success) {
      const typedError = result.error as {issues: ZodErrorEntry[]};
      throw new ZodException('Validation failed', typedError.issues);
    }

    return result.data as Record<string, unknown>;
  }
}
