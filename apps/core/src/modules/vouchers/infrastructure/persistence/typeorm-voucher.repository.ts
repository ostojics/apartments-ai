import {Inject, Injectable} from '@nestjs/common';
import {DataSource, LessThanOrEqual} from 'typeorm';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {IVoucherRepository} from '../../domain/repositories/voucher.repository.interface';
import {VoucherEntity} from '../../domain/voucher.entity';
import {VoucherMapper} from '../mappers/voucher.mapper';
import {VoucherOrmEntity} from './voucher.entity';
import {isBefore} from 'date-fns';

@Injectable()
export class TypeOrmVoucherRepository extends TypeOrmBaseRepository<VoucherOrmEntity> implements IVoucherRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, VoucherOrmEntity, transactionContext);
  }

  async save(voucher: VoucherEntity): Promise<void> {
    await this.repository.save(VoucherMapper.toPersistence(voucher));
  }

  async getByCode(code: string): Promise<VoucherEntity | null> {
    const record = await this.repository.findOne({where: {code}});
    if (!record) {
      return null;
    }

    return VoucherMapper.toDomain(record);
  }

  async findExpired(before: Date): Promise<VoucherEntity[]> {
    const records = await this.repository.find({
      where: {
        expiresAt: LessThanOrEqual(before),
      },
    });

    return records
      .map((record) => VoucherMapper.toDomain(record))
      .filter((voucher) => isBefore(voucher.expiresAt, before));
  }

  async markRedeemed(code: string): Promise<boolean> {
    const result = await this.repository.update(
      {
        code,
        status: 'issued',
      },
      {
        status: 'redeemed',
        redeemedAt: new Date(),
      },
    );

    return (result.affected ?? 0) > 0;
  }
}
