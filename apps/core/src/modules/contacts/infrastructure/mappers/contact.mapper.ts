import {ContactEntity} from '../../domain/contact.entity';
import {ContactOrmEntity} from '../persistence/contact.entity';

export class ContactMapper {
  static toDomain(ormEntity: ContactOrmEntity): ContactEntity {
    return ContactEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      email: ormEntity.email,
      phoneNumber: ormEntity.phoneNumber,
      preferredLanguage: ormEntity.preferredLanguage,
      tenantId: ormEntity.tenantId,
      createdAt: ormEntity.createdAt.toISOString(),
    });
  }

  static toPersistence(domainEntity: ContactEntity): ContactOrmEntity {
    const ormEntity = new ContactOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.email = domainEntity.email;
    ormEntity.phoneNumber = domainEntity.phoneNumber;
    ormEntity.preferredLanguage = domainEntity.preferredLanguage;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.createdAt = new Date(domainEntity.createdAt);

    return ormEntity;
  }
}
