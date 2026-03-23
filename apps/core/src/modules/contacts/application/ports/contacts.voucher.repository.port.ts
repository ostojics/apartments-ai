import {VoucherEntity} from 'src/modules/vouchers/domain/voucher.entity';

export interface IContactsVoucherRepositoryPort {
  save(voucher: VoucherEntity): Promise<void>;
}
