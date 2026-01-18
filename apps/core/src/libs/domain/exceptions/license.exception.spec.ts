import {LicenseErrorCode, LicenseExpiredException} from './license.exception';

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
