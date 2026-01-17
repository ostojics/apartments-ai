import {KnowledgeBaseEntity} from './knowledge-base.entity';
import {KnowledgeBaseCreatedEvent} from './events/knowledge-base-created.event';
import {KnowledgeBaseUpdatedEvent} from './events/knowledge-base-updated.event';

describe('KnowledgeBaseEntity', () => {
  it('creates a knowledge base with metadata defaults and emits an event', () => {
    const knowledgeBase = KnowledgeBaseEntity.create({
      buildingId: 'building-1',
      tenantId: 'tenant-1',
      knowledge: 'Knowledge text',
      information: 'Info text',
    });

    expect(knowledgeBase.buildingId).toBe('building-1');
    expect(knowledgeBase.tenantId).toBe('tenant-1');
    expect(knowledgeBase.knowledge).toBe('Knowledge text');
    expect(knowledgeBase.information).toBe('Info text');
    expect(knowledgeBase.metadata).toEqual({});
    expect(knowledgeBase.getEvents()).toHaveLength(1);
    expect(knowledgeBase.getEvents()[0]).toBeInstanceOf(KnowledgeBaseCreatedEvent);
  });

  it('updates fields and emits an update event', () => {
    const knowledgeBase = KnowledgeBaseEntity.create({
      buildingId: 'building-2',
      tenantId: 'tenant-2',
      knowledge: 'Original knowledge',
      information: 'Original info',
      metadata: {source: 'initial'},
    });

    knowledgeBase.clearEvents();
    knowledgeBase.update({
      knowledge: 'Updated knowledge',
      metadata: {source: 'updated'},
    });

    expect(knowledgeBase.knowledge).toBe('Updated knowledge');
    expect(knowledgeBase.metadata).toEqual({source: 'updated'});
    expect(knowledgeBase.getEvents()).toHaveLength(1);
    expect(knowledgeBase.getEvents()[0]).toBeInstanceOf(KnowledgeBaseUpdatedEvent);
  });
});
