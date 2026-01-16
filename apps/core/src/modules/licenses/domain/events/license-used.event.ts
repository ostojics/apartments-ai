import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class LicenseUsedEvent extends DomainEvent {
  constructor(
    public readonly licenseId: string,
    public readonly key: string,
  ) {
    super(licenseId);
  }
}
