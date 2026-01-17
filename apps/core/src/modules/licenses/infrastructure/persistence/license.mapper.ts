import {LicenseEntity} from '../../domain/license.entity';
import {LicenseOrmEntity} from './license.entity';

export class LicenseMapper {
  static toDomain(ormEntity: LicenseOrmEntity): LicenseEntity {
    return LicenseEntity.create({
      id: ormEntity.id,
      key: ormEntity.key,
      validDate: ormEntity.validDate,
      usedAt: ormEntity.usedAt,
      allowedBuildings: ormEntity.allowedBuildings,
      metadata: ormEntity.metadata,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: LicenseEntity): LicenseOrmEntity {
    const ormEntity = new LicenseOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.key = domainEntity.key;
    ormEntity.validDate = domainEntity.validDate;
    ormEntity.usedAt = domainEntity.usedAt;
    ormEntity.allowedBuildings = domainEntity.allowedBuildings;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
