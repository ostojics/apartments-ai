import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';
import {KnowledgeBaseOrmEntity} from '../persistence/knowledge-base.entity';

export class KnowledgeBaseMapper {
  static toDomain(ormEntity: KnowledgeBaseOrmEntity): KnowledgeBaseEntity {
    return KnowledgeBaseEntity.create({
      id: ormEntity.id,
      buildingId: ormEntity.buildingId,
      tenantId: ormEntity.tenantId,
      knowledge: ormEntity.knowledge,
      metadata: ormEntity.metadata,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: KnowledgeBaseEntity): KnowledgeBaseOrmEntity {
    const ormEntity = new KnowledgeBaseOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.buildingId = domainEntity.buildingId;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.knowledge = domainEntity.knowledge;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
