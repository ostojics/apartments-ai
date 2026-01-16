import {z} from 'zod';
import {InvalidAmountError} from '../exceptions/value-object.errors';

export const TransactionAmountSchema = z.number().positive('Transaction amount must be greater than 0');

export type TTransactionAmount = z.infer<typeof TransactionAmountSchema>;

export class TransactionAmount {
  #value: number;

  private constructor(value: number) {
    this.#value = value;
  }

  public static create(amount: number): TransactionAmount {
    const result = TransactionAmountSchema.safeParse(amount);

    if (!result.success) {
      throw new InvalidAmountError(amount);
    }

    return new TransactionAmount(result.data);
  }

  public get value(): number {
    return this.#value;
  }

  public equals(other: TransactionAmount): boolean {
    return this.#value === other.value;
  }
}
