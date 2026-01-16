import {z} from 'zod';
import {InvalidDescriptionError} from '../exceptions/value-object.errors';

export const TransactionDescriptionSchema = z.string().trim().min(1, 'Transaction description cannot be empty');

export type TTransactionDescription = z.infer<typeof TransactionDescriptionSchema>;

export class TransactionDescription {
  #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  public static create(description: string): TransactionDescription {
    const result = TransactionDescriptionSchema.safeParse(description);

    if (!result.success) {
      throw new InvalidDescriptionError(description);
    }

    return new TransactionDescription(result.data);
  }

  public get value(): string {
    return this.#value;
  }

  public equals(other: TransactionDescription): boolean {
    return this.#value === other.value;
  }
}
