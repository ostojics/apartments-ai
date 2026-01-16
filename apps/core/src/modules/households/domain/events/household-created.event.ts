import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class HouseholdCreatedEvent extends DomainEvent {
  constructor(
    public readonly householdId: string,
    public readonly name: string,
  ) {
    super(householdId);
  }
}
