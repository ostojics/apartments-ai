import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class TenantCreatedEvent extends DomainEvent {
  constructor(
    public readonly tenantId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly licenseId: string,
  ) {
    super(tenantId);
  }
}
