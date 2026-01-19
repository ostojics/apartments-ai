import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class ContactCreatedEvent extends DomainEvent {
  constructor(
    public readonly contactId: string,
    public readonly tenantId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phoneNumber: string | null,
    public readonly preferredLanguage: string,
  ) {
    super(contactId);
  }
}
