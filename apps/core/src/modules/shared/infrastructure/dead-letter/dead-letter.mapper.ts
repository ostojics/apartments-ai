import {DeadLetterEntity} from '../../domain/dead-letter/dead-letter.entity';
import {DeadLetterOrmEntity} from './dead-letter.entity';

export class DeadLetterMapper {
  static toPersistence(domainEntity: DeadLetterEntity): DeadLetterOrmEntity {
    const ormEntity = new DeadLetterOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.outboxId = domainEntity.outboxId;
    ormEntity.jobType = domainEntity.jobType;
    ormEntity.payload = domainEntity.payload;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.error = domainEntity.error;
    ormEntity.attempts = domainEntity.attempts;
    ormEntity.createdAt = new Date(domainEntity.createdAt);
    ormEntity.updatedAt = new Date(domainEntity.updatedAt);

    return ormEntity;
  }
}
