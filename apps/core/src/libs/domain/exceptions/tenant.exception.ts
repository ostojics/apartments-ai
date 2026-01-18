import {DomainException} from './exception.base';

export enum TenantErrorCode {
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',
}

export class TenantNotFoundException extends DomainException {
  constructor(slug?: string) {
    const message = slug ? `Tenant "${slug}" not found` : 'Tenant not found';
    super(message, TenantErrorCode.TENANT_NOT_FOUND, slug ? {slug} : undefined);
  }
}
