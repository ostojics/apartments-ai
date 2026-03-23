import {VoucherEntity} from '../../domain/voucher.entity';
import {VoucherOrmEntity} from '../persistence/voucher.entity';

export class VoucherMapper {
  static toDomain(ormEntity: VoucherOrmEntity): VoucherEntity {
    return VoucherEntity.create({
      id: ormEntity.id,
      code: ormEntity.code,
      discountPercent: ormEntity.discountPercent,
      expiresAt: ormEntity.expiresAt,
      status: ormEntity.status,
      email: ormEntity.email,
      tenantId: ormEntity.tenantId,
      metadata: ormEntity.metadata ?? {},
      redeemedAt: ormEntity.redeemedAt,
      createdAt: ormEntity.createdAt.toISOString(),
      updatedAt: ormEntity.updatedAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: VoucherEntity): VoucherOrmEntity {
    const ormEntity = new VoucherOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.code = domainEntity.code;
    ormEntity.discountPercent = domainEntity.discountPercent;
    ormEntity.expiresAt = domainEntity.expiresAt;
    ormEntity.status = domainEntity.status;
    ormEntity.email = domainEntity.email;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.redeemedAt = domainEntity.redeemedAt;
    ormEntity.createdAt = new Date(domainEntity.createdAt);
    ormEntity.updatedAt = new Date(domainEntity.updatedAt);

    return ormEntity;
  }
}
