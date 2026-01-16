import {z} from 'zod';
import {InvalidCurrencyCodeError} from '../household.errors';

export const CurrencyCodeSchema = z
  .string()
  .length(3, 'Currency code must be exactly 3 characters')
  .regex(/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters (e.g., USD, EUR)');

export type TCurrencyCode = z.infer<typeof CurrencyCodeSchema>;

export class CurrencyCode {
  #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  public static create(value: string): CurrencyCode {
    const result = CurrencyCodeSchema.safeParse(value);

    if (!result.success) {
      throw new InvalidCurrencyCodeError(value);
    }

    return new CurrencyCode(result.data);
  }

  public get value(): string {
    return this.#value;
  }

  public equals(other: CurrencyCode): boolean {
    return this.#value === other.value;
  }
}
