import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class HouseholdUpdatedEvent extends DomainEvent {
  constructor(
    public readonly householdId: string,
    public readonly updatedFields: {
      name?: string;
      currencyCode?: string;
      monthlyBudget?: number;
    },
  ) {
    super(householdId);
  }
}
