import {ContactEntity} from '../../domain/contact.entity';
import {ContactOrmEntity} from '../persistence/contact.entity';
import {ContactMapper} from './contact.mapper';

describe('ContactMapper', () => {
  it('maps domain to persistence', () => {
    const contact = ContactEntity.create({
      id: 'contact-123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phoneNumber: '+123456789',
      preferredLanguage: 'en-US',
      tenantId: 'tenant-456',
      createdAt: '2025-07-07T05:00:00.000Z',
    });

    const ormEntity = ContactMapper.toPersistence(contact);

    expect(ormEntity).toBeInstanceOf(ContactOrmEntity);
    expect(ormEntity.id).toBe('contact-123');
    expect(ormEntity.name).toBe('Jane Doe');
    expect(ormEntity.email).toBe('jane@example.com');
    expect(ormEntity.phoneNumber).toBe('+123456789');
    expect(ormEntity.preferredLanguage).toBe('en-US');
    expect(ormEntity.tenantId).toBe('tenant-456');
    expect(ormEntity.createdAt.toISOString()).toBe('2025-07-07T05:00:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new ContactOrmEntity();
    ormEntity.id = 'contact-789';
    ormEntity.name = 'John Smith';
    ormEntity.email = 'john@example.com';
    ormEntity.phoneNumber = null;
    ormEntity.preferredLanguage = 'sr-Latn';
    ormEntity.tenantId = 'tenant-999';
    ormEntity.createdAt = new Date('2025-08-08T04:15:00.000Z');

    const contact = ContactMapper.toDomain(ormEntity);

    expect(contact.id).toBe('contact-789');
    expect(contact.name).toBe('John Smith');
    expect(contact.email).toBe('john@example.com');
    expect(contact.phoneNumber).toBeNull();
    expect(contact.preferredLanguage).toBe('sr-Latn');
    expect(contact.tenantId).toBe('tenant-999');
    expect(contact.createdAt).toBe('2025-08-08T04:15:00.000Z');
  });
});
