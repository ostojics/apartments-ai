import {TenantEntity} from '../../domain/tenant.entity';
import {TenantOrmEntity} from '../persistence/tenant.entity';
import {TenantMapper} from './tenant.mapper';

describe('TenantMapper', () => {
  it('maps domain to persistence', () => {
    const tenant = TenantEntity.create({
      id: 'tenant-123',
      name: 'Acme Apartments',
      slug: 'acme',
      licenseId: 'license-456',
      createdAt: '2025-01-01T12:00:00.000Z',
    });

    const ormEntity = TenantMapper.toPersistence(tenant);

    expect(ormEntity).toBeInstanceOf(TenantOrmEntity);
    expect(ormEntity.id).toBe('tenant-123');
    expect(ormEntity.name).toBe('Acme Apartments');
    expect(ormEntity.slug).toBe('acme');
    expect(ormEntity.licenseId).toBe('license-456');
    expect(ormEntity.createdAt.toISOString()).toBe('2025-01-01T12:00:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new TenantOrmEntity();
    ormEntity.id = 'tenant-789';
    ormEntity.name = 'Northside';
    ormEntity.slug = 'northside';
    ormEntity.licenseId = 'license-999';
    ormEntity.createdAt = new Date('2025-02-02T10:30:00.000Z');

    const tenant = TenantMapper.toDomain(ormEntity);

    expect(tenant.id).toBe('tenant-789');
    expect(tenant.name).toBe('Northside');
    expect(tenant.slug).toBe('northside');
    expect(tenant.licenseId).toBe('license-999');
    expect(tenant.createdAt).toBe('2025-02-02T10:30:00.000Z');
  });
});
