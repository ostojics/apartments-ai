import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class BuildingUpdatedEvent extends DomainEvent {
  constructor(
    public readonly buildingId: string,
    public readonly updatedFields: {
      name?: string;
      slug?: string;
      imageUrl?: string | null;
      address?: string | null;
    },
  ) {
    super(buildingId);
  }
}
