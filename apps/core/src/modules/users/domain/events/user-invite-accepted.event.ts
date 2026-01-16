import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class UserInviteAcceptedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly householdId: string,
  ) {
    super(userId);
  }
}
