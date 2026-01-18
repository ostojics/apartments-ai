import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class BuildingCreatedEvent extends DomainEvent {
  constructor(
    public readonly buildingId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly tenantId: string,
  ) {
    super(buildingId);
  }
}
