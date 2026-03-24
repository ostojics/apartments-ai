import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {IDeadLetterRepository} from '../../domain/dead-letter/dead-letter.repository.interface';
import {DeadLetterEntity} from '../../domain/dead-letter/dead-letter.entity';
import {DeadLetterOrmEntity} from './dead-letter.entity';
import {DeadLetterMapper} from './dead-letter.mapper';

@Injectable()
export class TypeOrmDeadLetterRepository
  extends TypeOrmBaseRepository<DeadLetterOrmEntity>
  implements IDeadLetterRepository
{
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, DeadLetterOrmEntity, transactionContext);
  }

  async save(deadLetter: DeadLetterEntity): Promise<void> {
    await this.repository.save(DeadLetterMapper.toPersistence(deadLetter));
  }
}
