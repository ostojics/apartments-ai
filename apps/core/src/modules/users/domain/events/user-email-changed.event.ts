import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class UserEmailChangedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {
    super(userId);
  }
}
