import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IFeedbackRepository} from '../../domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from '../../domain/feedback.entity';
import {FeedbackOrmEntity} from './feedback.entity';
import {FeedbackMapper} from '../mappers/feedback.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmFeedbackRepository implements IFeedbackRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<FeedbackOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(FeedbackOrmEntity);
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
