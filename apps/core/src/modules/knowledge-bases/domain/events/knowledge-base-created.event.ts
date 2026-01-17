import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class KnowledgeBaseCreatedEvent extends DomainEvent {
  constructor(
    public readonly knowledgeBaseId: string,
    public readonly buildingId: string,
    public readonly tenantId: string,
  ) {
    super(knowledgeBaseId);
  }
}
