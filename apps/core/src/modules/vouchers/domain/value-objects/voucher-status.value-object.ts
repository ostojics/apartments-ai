import {z} from 'zod';

const voucherStatusSchema = z.enum(['issued', 'redeemed', 'expired']);

export class VoucherStatus {
  private constructor(private readonly value: 'issued' | 'redeemed' | 'expired') {}

  static create(value: 'issued' | 'redeemed' | 'expired'): VoucherStatus {
    const parsed = voucherStatusSchema.safeParse(value);
    if (!parsed.success) {
      throw new Error('Invalid voucher status');
    }

    return new VoucherStatus(parsed.data);
  }

  getValue(): 'issued' | 'redeemed' | 'expired' {
    return this.value;
  }
}
