import {Injectable} from '@nestjs/common';
import {IContactsVoucherRepositoryPort} from 'src/modules/contacts/application/ports/contacts.voucher.repository.port';
import {IVoucherRepository} from '../../domain/repositories/voucher.repository.interface';
import {VoucherEntity} from '../../domain/voucher.entity';

@Injectable()
export class ContactsVoucherRepositoryAdapter implements IContactsVoucherRepositoryPort {
  constructor(private readonly voucherRepository: IVoucherRepository) {}

  async save(voucher: VoucherEntity): Promise<void> {
    await this.voucherRepository.save(voucher);
  }
}
