import {BuildingEntity} from '../../domain/building.entity';
import {BuildingOrmEntity} from '../persistence/building.entity';
import {BuildingMapper} from './building.mapper';

describe('BuildingMapper', () => {
  it('maps domain to persistence', () => {
    const building = BuildingEntity.create({
      id: 'building-123',
      name: 'Main Tower',
      slug: 'main-tower',
      tenantId: 'tenant-456',
      imageUrl: 'https://example.com/main.png',
      address: '123 Main St',
      createdAt: '2025-03-03T09:00:00.000Z',
    });

    const ormEntity = BuildingMapper.toPersistence(building);

    expect(ormEntity).toBeInstanceOf(BuildingOrmEntity);
    expect(ormEntity.id).toBe('building-123');
    expect(ormEntity.name).toBe('Main Tower');
    expect(ormEntity.slug).toBe('main-tower');
    expect(ormEntity.tenantId).toBe('tenant-456');
    expect(ormEntity.imageUrl).toBe('https://example.com/main.png');
    expect(ormEntity.address).toBe('123 Main St');
    expect(ormEntity.createdAt.toISOString()).toBe('2025-03-03T09:00:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new BuildingOrmEntity();
    ormEntity.id = 'building-789';
    ormEntity.name = 'South Tower';
    ormEntity.slug = 'south-tower';
    ormEntity.tenantId = 'tenant-000';
    ormEntity.imageUrl = null;
    ormEntity.address = null;
    ormEntity.createdAt = new Date('2025-04-04T08:15:00.000Z');

    const building = BuildingMapper.toDomain(ormEntity);

    expect(building.id).toBe('building-789');
    expect(building.name).toBe('South Tower');
    expect(building.slug).toBe('south-tower');
    expect(building.tenantId).toBe('tenant-000');
    expect(building.imageUrl).toBeNull();
    expect(building.address).toBeNull();
    expect(building.createdAt).toBe('2025-04-04T08:15:00.000Z');
  });
});
