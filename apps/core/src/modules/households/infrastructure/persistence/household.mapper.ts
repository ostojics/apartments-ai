import {HouseholdEntity} from '../../domain/household.entity';
import {HouseholdOrmEntity} from './household.entity';

export class HouseholdMapper {
  static toDomain(ormEntity: HouseholdOrmEntity): HouseholdEntity {
    return HouseholdEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      currencyCode: ormEntity.currencyCode,
      monthlyBudget: Number(ormEntity.monthlyBudget),
      createdAt: ormEntity.createdAt.toISOString(),
      updatedAt: ormEntity.updatedAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: HouseholdEntity): HouseholdOrmEntity {
    const ormEntity = new HouseholdOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.currencyCode = domainEntity.currencyCode;
    ormEntity.monthlyBudget = domainEntity.monthlyBudget;
    ormEntity.createdAt = new Date(domainEntity.createdAt);
    ormEntity.updatedAt = new Date(domainEntity.updatedAt);
    return ormEntity;
  }
}
