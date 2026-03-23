import {VoucherEntity} from '../voucher.entity';

export const VOUCHER_REPOSITORY = Symbol('VOUCHER_REPOSITORY');

export interface IVoucherRepository {
  save(voucher: VoucherEntity): Promise<void>;
  getByCode(code: string): Promise<VoucherEntity | null>;
  findExpired(before: Date): Promise<VoucherEntity[]>;
  markRedeemed(code: string): Promise<boolean>;
}
