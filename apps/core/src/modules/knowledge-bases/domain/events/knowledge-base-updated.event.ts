import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class KnowledgeBaseUpdatedEvent extends DomainEvent {
  constructor(
    public readonly knowledgeBaseId: string,
    public readonly updatedFields: {
      knowledge?: string;
      information?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(knowledgeBaseId);
  }
}
