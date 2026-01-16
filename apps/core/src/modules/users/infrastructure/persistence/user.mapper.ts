import {UserEntity} from '../../domain/user.entity';
import {UserOrmEntity} from './user.entity';

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): UserEntity {
    return UserEntity.create({
      id: ormEntity.id,
      householdId: ormEntity.householdId,
      username: ormEntity.username,
      email: ormEntity.email,
      passwordHash: ormEntity.passwordHash,
      isHouseholdAuthor: ormEntity.isHouseholdAuthor,
      createdAt: ormEntity.createdAt.toISOString(),
      updatedAt: ormEntity.updatedAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: UserEntity): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.householdId = domainEntity.householdId;
    ormEntity.username = domainEntity.username;
    ormEntity.email = domainEntity.email;
    ormEntity.passwordHash = domainEntity.passwordHash;
    ormEntity.isHouseholdAuthor = domainEntity.isHouseholdAuthor;
    ormEntity.createdAt = new Date(domainEntity.createdAt);
    ormEntity.updatedAt = new Date(domainEntity.updatedAt);
    return ormEntity;
  }
}
