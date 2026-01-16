import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class LicenseExpiredEvent extends DomainEvent {
  constructor(
    public readonly licenseId: string,
    public readonly key: string,
    public readonly expiresAt: Date,
  ) {
    super(licenseId);
  }
}
