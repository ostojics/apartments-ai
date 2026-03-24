import {z} from 'zod';

const voucherDiscountPercentSchema = z.number().int().min(1).max(100);

export class VoucherDiscountPercent {
  private constructor(private readonly value: number) {}

  static create(value: number): VoucherDiscountPercent {
    const parsed = voucherDiscountPercentSchema.safeParse(value);
    if (!parsed.success) {
      throw new Error('Invalid voucher discount percent');
    }

    return new VoucherDiscountPercent(parsed.data);
  }

  getValue(): number {
    return this.value;
  }
}
