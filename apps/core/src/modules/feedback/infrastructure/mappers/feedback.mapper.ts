import {FeedbackEntity} from '../../domain/feedback.entity';
import {FeedbackOrmEntity} from '../persistence/feedback.entity';

export class FeedbackMapper {
  static toDomain(ormEntity: FeedbackOrmEntity): FeedbackEntity {
    return FeedbackEntity.create({
      id: ormEntity.id,
      content: ormEntity.content,
      metadata: ormEntity.metadata,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: FeedbackEntity): FeedbackOrmEntity {
    const ormEntity = new FeedbackOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.content = domainEntity.content;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
