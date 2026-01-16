import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class HouseholdDeletedEvent extends DomainEvent {
  constructor(
    public readonly householdId: string,
    public readonly name: string,
  ) {
    super(householdId);
  }
}
