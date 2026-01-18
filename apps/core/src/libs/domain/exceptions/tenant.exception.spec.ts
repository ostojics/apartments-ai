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
