import {BuildingInformationEntity} from '../../domain/building-information.entity';
import {BuildingInformationOrmEntity} from '../persistence/building-information.entity';
import {BuildingInformationMapper} from './building-information.mapper';

describe('BuildingInformationMapper', () => {
  it('maps domain to persistence', () => {
    const information = BuildingInformationEntity.create({
      id: 'info-123',
      knowledgeBaseId: 'kb-456',
      buildingId: 'building-789',
      tenantId: 'tenant-000',
      locale: 'en-US',
      content: 'Test building information content',
      createdAt: '2025-03-03T09:00:00.000Z',
    });

    const ormEntity = BuildingInformationMapper.toPersistence(information);

    expect(ormEntity).toBeInstanceOf(BuildingInformationOrmEntity);
    expect(ormEntity.id).toBe('info-123');
    expect(ormEntity.knowledgeBaseId).toBe('kb-456');
    expect(ormEntity.buildingId).toBe('building-789');
    expect(ormEntity.tenantId).toBe('tenant-000');
    expect(ormEntity.locale).toBe('en-US');
    expect(ormEntity.content).toBe('Test building information content');
    expect(ormEntity.createdAt.toISOString()).toBe('2025-03-03T09:00:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new BuildingInformationOrmEntity();
    ormEntity.id = 'info-999';
    ormEntity.knowledgeBaseId = 'kb-888';
    ormEntity.buildingId = 'building-777';
    ormEntity.tenantId = 'tenant-666';
    ormEntity.locale = 'nl-NL';
    ormEntity.content = 'Dutch building information';
    ormEntity.createdAt = new Date('2025-04-04T08:15:00.000Z');

    const information = BuildingInformationMapper.toDomain(ormEntity);

    expect(information.id).toBe('info-999');
    expect(information.knowledgeBaseId).toBe('kb-888');
    expect(information.buildingId).toBe('building-777');
    expect(information.tenantId).toBe('tenant-666');
    expect(information.locale).toBe('nl-NL');
    expect(information.content).toBe('Dutch building information');
    expect(information.createdAt).toBe('2025-04-04T08:15:00.000Z');
  });
});
