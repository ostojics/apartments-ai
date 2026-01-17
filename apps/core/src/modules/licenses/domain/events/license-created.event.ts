import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class LicenseCreatedEvent extends DomainEvent {
  constructor(
    public readonly licenseId: string,
    public readonly key: string,
    public readonly validDate: Date,
  ) {
    super(licenseId);
  }
}
