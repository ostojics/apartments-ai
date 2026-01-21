import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class BuildingInformationCreatedEvent extends DomainEvent {
  constructor(
    public readonly buildingInformationId: string,
    public readonly knowledgeBaseId: string,
    public readonly locale: string,
    public readonly content: string,
  ) {
    super(buildingInformationId);
  }
}
