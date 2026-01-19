import {TenantEntity} from '../../domain/tenant.entity';
import {TenantOrmEntity} from '../persistence/tenant.entity';

export class TenantMapper {
  static toDomain(ormEntity: TenantOrmEntity): TenantEntity {
    return TenantEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      slug: ormEntity.slug,
      licenseId: ormEntity.licenseId,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: TenantEntity): TenantOrmEntity {
    const ormEntity = new TenantOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.slug = domainEntity.slug;
    ormEntity.licenseId = domainEntity.licenseId;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
