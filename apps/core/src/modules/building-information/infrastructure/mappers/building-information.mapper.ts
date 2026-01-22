import {BuildingInformationEntity} from '../../domain/building-information.entity';
import {BuildingInformationOrmEntity} from '../persistence/building-information.entity';

export class BuildingInformationMapper {
  static toDomain(ormEntity: BuildingInformationOrmEntity): BuildingInformationEntity {
    return BuildingInformationEntity.create({
      id: ormEntity.id,
      knowledgeBaseId: ormEntity.knowledgeBaseId,
      buildingId: ormEntity.buildingId,
      tenantId: ormEntity.tenantId,
      locale: ormEntity.locale,
      content: ormEntity.content,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: BuildingInformationEntity): BuildingInformationOrmEntity {
    const ormEntity = new BuildingInformationOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.knowledgeBaseId = domainEntity.knowledgeBaseId;
    ormEntity.buildingId = domainEntity.buildingId;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.locale = domainEntity.locale;
    ormEntity.content = domainEntity.content;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
