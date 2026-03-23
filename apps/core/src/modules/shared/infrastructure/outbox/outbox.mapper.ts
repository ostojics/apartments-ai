import {OutboxEntity} from '../../domain/outbox/outbox.entity';
import {OutboxOrmEntity} from './outbox.entity';

export class OutboxMapper {
  static toDomain(ormEntity: OutboxOrmEntity): OutboxEntity {
    return OutboxEntity.create({
      id: ormEntity.id,
      jobType: ormEntity.jobType,
      payload: ormEntity.payload,
      tenantId: ormEntity.tenantId,
      status: ormEntity.status,
      attempts: ormEntity.attempts,
      sentAt: ormEntity.sentAt,
      lastError: ormEntity.lastError,
      result: ormEntity.result,
      createdAt: ormEntity.createdAt.toISOString(),
      updatedAt: ormEntity.updatedAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: OutboxEntity): OutboxOrmEntity {
    const ormEntity = new OutboxOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.jobType = domainEntity.jobType;
    ormEntity.payload = domainEntity.payload;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.status = domainEntity.status;
    ormEntity.attempts = domainEntity.attempts;
    ormEntity.sentAt = domainEntity.sentAt;
    ormEntity.lastError = domainEntity.lastError;
    ormEntity.result = domainEntity.result;
    ormEntity.createdAt = new Date(domainEntity.createdAt);
    ormEntity.updatedAt = new Date(domainEntity.updatedAt);

    return ormEntity;
  }
}
