import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IFeedbackRepository} from '../../domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from '../../domain/feedback.entity';
import {FeedbackOrmEntity} from './feedback.entity';
import {FeedbackMapper} from '../mappers/feedback.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmFeedbackRepository extends TypeOrmBaseRepository<FeedbackOrmEntity> implements IFeedbackRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, FeedbackOrmEntity, transactionContext);
  }

  async save(feedback: FeedbackEntity): Promise<void> {
    const persistenceModel = FeedbackMapper.toPersistence(feedback);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<FeedbackEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return FeedbackMapper.toDomain(record);
  }
}
