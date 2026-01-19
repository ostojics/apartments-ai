import {TenantCheckHandler} from './tenant-check.query.handler';
import {TenantCheckQuery} from '../../../modules/tenants/application/queries/tenant-check.query';
import {ITenantRepository} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';
import {ILicenseRepository} from 'src/modules/licenses/domain/repositories/license.repository.interface';
import {TenantEntity} from 'src/modules/tenants/domain/tenant.entity';
import {LicenseEntity} from 'src/modules/licenses/domain/license.entity';
import {LoggerPort} from '../ports/logger.port';
import {IAnalyticsService} from 'src/modules/shared/application/analytics/analytics.interface';

describe('TenantCheckHandler', () => {
  const createTenantRepository = () => {
    const findBySlug = jest.fn();
    return {
      repository: {
        create: jest.fn(),
        findById: jest.fn(),
        findBySlug,
        update: jest.fn(),
        delete: jest.fn(),
        exists: jest.fn(),
      } as jest.Mocked<ITenantRepository>,
      findBySlug,
    };
  };

  const createLicenseRepository = () => {
    const findById = jest.fn();
    return {
      repository: {
        create: jest.fn(),
        findById,
        findByKey: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        exists: jest.fn(),
      } as jest.Mocked<ILicenseRepository>,
      findById,
    };
  };

  const createLogger = (): LoggerPort => ({
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  });

  const createAnalyticsService = (): IAnalyticsService => ({
    captureEvent: jest.fn(),
    captureException: jest.fn(),
    shutdown: jest.fn(() => Promise.resolve()),
  });

  it('returns invalid when tenant does not exist', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    findBySlug.mockResolvedValue(null);

    const handler = new TenantCheckHandler(
      tenantRepository,
      licenseRepository,
      createLogger(),
      createAnalyticsService(),
    );
    const result = await handler.execute(new TenantCheckQuery({slug: 'missing'}));

    expect(result).toEqual({isValid: false, tenant: null});
    expect(findById).not.toHaveBeenCalled();
  });

  it('returns invalid when license is missing or invalid', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    const expiredLicense = LicenseEntity.create({
      key: 'expired-key',
      expiresAt: new Date('2000-01-01T00:00:00Z'),
    });
    const tenant = TenantEntity.create({
      name: 'Acme Apartments',
      slug: 'acme',
      licenseId: expiredLicense.id,
    });

    findBySlug.mockResolvedValue(tenant);
    findById.mockResolvedValue(expiredLicense);

    const handler = new TenantCheckHandler(
      tenantRepository,
      licenseRepository,
      createLogger(),
      createAnalyticsService(),
    );
    const result = await handler.execute(new TenantCheckQuery({slug: 'acme'}));

    expect(result.isValid).toBe(false);
    expect(result.tenant).toEqual({id: tenant.id, slug: 'acme', name: 'Acme Apartments'});
  });

  it('returns valid when tenant and license are valid', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    const validLicense = LicenseEntity.create({
      key: 'valid-key',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });
    const tenant = TenantEntity.create({
      name: 'Brighton Apartments',
      slug: 'brighton',
      licenseId: validLicense.id,
    });

    findBySlug.mockResolvedValue(tenant);
    findById.mockResolvedValue(validLicense);

    const handler = new TenantCheckHandler(
      tenantRepository,
      licenseRepository,
      createLogger(),
      createAnalyticsService(),
    );
    const result = await handler.execute(new TenantCheckQuery({slug: 'brighton'}));

    expect(result).toEqual({
      isValid: true,
      tenant: {id: tenant.id, slug: 'brighton', name: 'Brighton Apartments'},
    });
  });
});
