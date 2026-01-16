import {LicenseEntity} from '../../domain/license.entity';
import {LicenseOrmEntity} from './license.entity';

export class LicenseMapper {
  static toDomain(ormEntity: LicenseOrmEntity): LicenseEntity {
    return LicenseEntity.create({
      id: ormEntity.id,
      key: ormEntity.key,
      expiresAt: ormEntity.expiresAt,
      usedAt: ormEntity.usedAt,
      note: ormEntity.note,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: LicenseEntity): LicenseOrmEntity {
    const ormEntity = new LicenseOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.key = domainEntity.key;
    ormEntity.expiresAt = domainEntity.expiresAt;
    ormEntity.usedAt = domainEntity.usedAt;
    ormEntity.note = domainEntity.note;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
