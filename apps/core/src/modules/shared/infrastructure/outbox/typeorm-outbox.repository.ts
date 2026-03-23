import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {IOutboxRepository} from '../../domain/outbox/outbox.repository.interface';
import {OutboxEntity} from '../../domain/outbox/outbox.entity';
import {OutboxOrmEntity} from './outbox.entity';
import {OutboxMapper} from './outbox.mapper';

@Injectable()
export class TypeOrmOutboxRepository extends TypeOrmBaseRepository<OutboxOrmEntity> implements IOutboxRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, OutboxOrmEntity, transactionContext);
  }

  async save(outbox: OutboxEntity): Promise<void> {
    await this.repository.save(OutboxMapper.toPersistence(outbox));
  }

  async findById(id: string): Promise<OutboxEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) {
      return null;
    }

    return OutboxMapper.toDomain(record);
  }

  async findPendingToQueue(limit: number): Promise<OutboxEntity[]> {
    const records = await this.repository.find({
      where: {
        status: 'pending',
      },
      take: limit,
    });

    return records.map((record) => OutboxMapper.toDomain(record));
  }
}
