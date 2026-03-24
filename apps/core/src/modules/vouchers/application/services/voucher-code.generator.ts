import {randomBytes} from 'crypto';

export class VoucherCodeGenerator {
  static generate(prefix = 'HE'): string {
    const first = randomBytes(2).toString('hex').toUpperCase();
    const second = randomBytes(2).toString('hex').toUpperCase();
    return `${prefix}-${first}-${second}`;
  }
}
