import {DomainException} from './exception.base';

export enum LicenseErrorCode {
  LICENSE_EXPIRED = 'LICENSE_EXPIRED',
  LICENSE_NOT_FOUND = 'LICENSE_NOT_FOUND',
}

export class LicenseExpiredException extends DomainException {
  constructor(licenseId?: string) {
    const message = licenseId ? `License "${licenseId}" has expired` : 'License has expired';
    super(message, LicenseErrorCode.LICENSE_EXPIRED, licenseId ? {licenseId} : undefined);
  }
}

export class LicenseNotFoundException extends DomainException {
  constructor(licenseId?: string) {
    const message = licenseId ? `License "${licenseId}" not found` : 'License not found';
    super(message, LicenseErrorCode.LICENSE_NOT_FOUND, licenseId ? {licenseId} : undefined);
  }
}
