import {LicenseErrorCode, LicenseExpiredException} from './license.exception';
import {TenantErrorCode, TenantNotFoundException} from './tenant.exception';

describe('TenantNotFoundException', () => {
  it('captures tenant slug details', () => {
    const error = new TenantNotFoundException('acme');

    expect(error.code).toBe(TenantErrorCode.TENANT_NOT_FOUND);
    expect(error.message).toBe('Tenant "acme" not found');
    expect(error.metadata).toEqual({slug: 'acme'});
  });

  it('handles missing slug', () => {
    const error = new TenantNotFoundException();

    expect(error.code).toBe(TenantErrorCode.TENANT_NOT_FOUND);
    expect(error.message).toBe('Tenant not found');
    expect(error.metadata).toBeUndefined();
  });
});

describe('LicenseExpiredException', () => {
  it('captures license details', () => {
    const error = new LicenseExpiredException('license-123');

    expect(error.code).toBe(LicenseErrorCode.LICENSE_EXPIRED);
    expect(error.message).toBe('License "license-123" has expired');
    expect(error.metadata).toEqual({licenseId: 'license-123'});
  });

  it('handles missing license id', () => {
    const error = new LicenseExpiredException();

    expect(error.code).toBe(LicenseErrorCode.LICENSE_EXPIRED);
    expect(error.message).toBe('License has expired');
    expect(error.metadata).toBeUndefined();
  });
});
