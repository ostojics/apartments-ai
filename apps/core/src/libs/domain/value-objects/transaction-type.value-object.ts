import {z} from 'zod';
import {InvalidTransactionTypeError} from '../exceptions/value-object.errors';

export const TransactionTypeSchema = z.enum(['income', 'expense'], {
  errorMap: () => ({message: 'Transaction type must be either "income" or "expense"'}),
});

export type TTransactionType = z.infer<typeof TransactionTypeSchema>;

export class TransactionType {
  #value: TTransactionType;

  private constructor(value: TTransactionType) {
    this.#value = value;
  }

  public static create(type: string): TransactionType {
    const result = TransactionTypeSchema.safeParse(type);

    if (!result.success) {
      throw new InvalidTransactionTypeError(type);
    }

    return new TransactionType(result.data);
  }

  public get value(): TTransactionType {
    return this.#value;
  }

  public isIncome(): boolean {
    return this.#value === 'income';
  }

  public isExpense(): boolean {
    return this.#value === 'expense';
  }

  public equals(other: TransactionType): boolean {
    return this.#value === other.value;
  }
}
