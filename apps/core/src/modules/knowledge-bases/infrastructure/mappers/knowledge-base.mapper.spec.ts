import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';
import {KnowledgeBaseOrmEntity} from '../persistence/knowledge-base.entity';
import {KnowledgeBaseMapper} from './knowledge-base.mapper';

describe('KnowledgeBaseMapper', () => {
  it('maps domain to persistence', () => {
    const knowledgeBase = KnowledgeBaseEntity.create({
      id: 'kb-123',
      buildingId: 'building-456',
      tenantId: 'tenant-789',
      knowledge: 'Policy details',
      metadata: {category: 'policy'},
      createdAt: '2025-09-09T03:30:00.000Z',
    });

    const ormEntity = KnowledgeBaseMapper.toPersistence(knowledgeBase);

    expect(ormEntity).toBeInstanceOf(KnowledgeBaseOrmEntity);
    expect(ormEntity.id).toBe('kb-123');
    expect(ormEntity.buildingId).toBe('building-456');
    expect(ormEntity.tenantId).toBe('tenant-789');
    expect(ormEntity.knowledge).toBe('Policy details');
    expect(ormEntity.metadata).toEqual({category: 'policy'});
    expect(ormEntity.createdAt.toISOString()).toBe('2025-09-09T03:30:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new KnowledgeBaseOrmEntity();
    ormEntity.id = 'kb-999';
    ormEntity.buildingId = 'building-000';
    ormEntity.tenantId = 'tenant-111';
    ormEntity.knowledge = 'FAQ content';
    ormEntity.metadata = {category: 'faq'};
    ormEntity.createdAt = new Date('2025-10-10T10:00:00.000Z');

    const knowledgeBase = KnowledgeBaseMapper.toDomain(ormEntity);

    expect(knowledgeBase.id).toBe('kb-999');
    expect(knowledgeBase.buildingId).toBe('building-000');
    expect(knowledgeBase.tenantId).toBe('tenant-111');
    expect(knowledgeBase.knowledge).toBe('FAQ content');
    expect(knowledgeBase.metadata).toEqual({category: 'faq'});
    expect(knowledgeBase.createdAt).toBe('2025-10-10T10:00:00.000Z');
  });
});
