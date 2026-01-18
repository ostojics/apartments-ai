import {DomainException} from './exception.base';

export enum LicenseErrorCode {
  LICENSE_EXPIRED = 'LICENSE_EXPIRED',
}

export class LicenseExpiredException extends DomainException {
  constructor(licenseId?: string) {
    const message = licenseId ? `License "${licenseId}" has expired` : 'License has expired';
    super(message, LicenseErrorCode.LICENSE_EXPIRED, licenseId ? {licenseId} : undefined);
  }
}
