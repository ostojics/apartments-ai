import {Injectable, PipeTransform, ArgumentMetadata} from '@nestjs/common';
import {ZodErrorEntry, ZodException} from '../exceptions/zod.exception';

interface Schema {
  safeParse: (data: unknown) => {success: boolean; data?: unknown; error?: unknown};
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

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
