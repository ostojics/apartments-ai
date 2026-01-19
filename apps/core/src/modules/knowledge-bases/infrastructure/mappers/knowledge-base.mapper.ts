import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';
import {KnowledgeBaseOrmEntity} from '../persistence/knowledge-base.entity';

export class KnowledgeBaseMapper {
  static toDomain(ormEntity: KnowledgeBaseOrmEntity): KnowledgeBaseEntity {
    return KnowledgeBaseEntity.create({
      id: ormEntity.id,
      buildingId: ormEntity.buildingId,
      tenantId: ormEntity.tenantId,
      knowledge: ormEntity.knowledge,
      information: ormEntity.information,
      metadata: ormEntity.metadata,
    });
  }

  static toPersistence(domainEntity: KnowledgeBaseEntity): KnowledgeBaseOrmEntity {
    const ormEntity = new KnowledgeBaseOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.buildingId = domainEntity.buildingId;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.knowledge = domainEntity.knowledge;
    ormEntity.information = domainEntity.information;
    ormEntity.metadata = domainEntity.metadata;

    return ormEntity;
  }
}
