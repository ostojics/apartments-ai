import {BuildingInformationEntity} from '../../domain/building-information.entity';
import {BuildingInformationOrmEntity} from '../persistence/building-information.entity';

export class BuildingInformationMapper {
  static toPersistence(entity: BuildingInformationEntity): BuildingInformationOrmEntity {
    const ormEntity = new BuildingInformationOrmEntity();
    ormEntity.id = entity.id;
    ormEntity.knowledgeBaseId = entity.knowledgeBaseId;
    ormEntity.buildingId = entity.buildingId;
    ormEntity.tenantId = entity.tenantId;
    ormEntity.locale = entity.locale;
    ormEntity.content = entity.content;
    ormEntity.createdAt = new Date(entity.createdAt);
    return ormEntity;
  }

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
}
