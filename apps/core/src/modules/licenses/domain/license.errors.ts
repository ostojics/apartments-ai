import {
  NotFoundDomainException,
  ConflictDomainException,
  BadRequestDomainException,
} from 'src/libs/domain/exceptions/exception.base';

export enum LicenseErrorCode {
  NOT_FOUND = 'LICENSE_NOT_FOUND',
  ALREADY_USED = 'LICENSE_ALREADY_USED',
  EXPIRED = 'LICENSE_EXPIRED',
  INVALID = 'LICENSE_INVALID',
  ALREADY_EXISTS = 'LICENSE_ALREADY_EXISTS',
  INVALID_EXPIRATION_DATE = 'INVALID_EXPIRATION_DATE',
}

export class LicenseNotFoundError extends NotFoundDomainException {
  constructor(identifier: string) {
    super(`License with identifier "${identifier}" not found.`, LicenseErrorCode.NOT_FOUND);
  }
}

export class LicenseAlreadyUsedError extends ConflictDomainException {
  constructor(licenseKey: string) {
    super(`License with key "${licenseKey}" has already been used.`, LicenseErrorCode.ALREADY_USED);
  }
}

export class LicenseExpiredError extends BadRequestDomainException {
  constructor(licenseKey: string, expirationDate: Date) {
    super(`License with key "${licenseKey}" expired on ${expirationDate.toISOString()}.`, LicenseErrorCode.EXPIRED);
  }
}

export class LicenseInvalidError extends BadRequestDomainException {
  constructor(licenseKey: string) {
    super(`License with key "${licenseKey}" is invalid or malformed.`, LicenseErrorCode.INVALID);
  }
}

export class LicenseAlreadyExistsError extends ConflictDomainException {
  constructor(licenseKey: string) {
    super(`License with key "${licenseKey}" already exists.`, LicenseErrorCode.ALREADY_EXISTS);
  }
}

export class InvalidExpirationDateError extends BadRequestDomainException {
  constructor(date: Date) {
    super(
      `Invalid expiration date "${date.toISOString()}". Date must be in the future.`,
      LicenseErrorCode.INVALID_EXPIRATION_DATE,
    );
  }
}
