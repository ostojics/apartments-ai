import {BuildingEntity} from '../../domain/building.entity';
import {BuildingOrmEntity} from '../persistence/building.entity';

export class BuildingMapper {
  static toDomain(ormEntity: BuildingOrmEntity): BuildingEntity {
    return BuildingEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      slug: ormEntity.slug,
      tenantId: ormEntity.tenantId,
      imageUrl: ormEntity.imageUrl,
      address: ormEntity.address,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: BuildingEntity): BuildingOrmEntity {
    const ormEntity = new BuildingOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.slug = domainEntity.slug;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.imageUrl = domainEntity.imageUrl;
    ormEntity.address = domainEntity.address;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
