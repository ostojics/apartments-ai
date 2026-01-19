import {ExecutionContext} from '@nestjs/common';
import {LicenseExpiredException, LicenseNotFoundException} from 'src/libs/domain/exceptions/license.exception';
import {TenantNotFoundException} from 'src/libs/domain/exceptions/tenant.exception';
import {LicenseEntity} from 'src/modules/licenses/domain/license.entity';
import {ILicenseRepository} from 'src/modules/licenses/domain/repositories/license.repository.interface';
import {TenantEntity} from 'src/modules/tenants/domain/tenant.entity';
import {ITenantRepository} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';
import {TenantGuard, TenantRequest} from './tenant.guard';

const createTenantRepository = () => {
  const findBySlug = jest.fn();
  const repository: ITenantRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findBySlug,
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  };

  return {repository, findBySlug};
};

const createLicenseRepository = () => {
  const findById = jest.fn();
  const repository: ILicenseRepository = {
    create: jest.fn(),
    findById,
    findByKey: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  };

  return {repository, findById};
};

const buildContext = (request: TenantRequest): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  }) as ExecutionContext;

describe('TenantGuard', () => {
  it('sets tenant info when tenant exists and license is valid', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });
    const license = LicenseEntity.create({
      id: tenant.licenseId,
      key: 'license-key',
      expiresAt: new Date(Date.now() + 60_000),
    });

    findBySlug.mockResolvedValue(tenant);
    findById.mockResolvedValue(license);

    const guard = new TenantGuard(tenantRepository, licenseRepository);
    const request = {headers: {host: 'acme.example.com'}} as TenantRequest;

    await expect(guard.canActivate(buildContext(request))).resolves.toBe(true);
    expect(request.tenant).toEqual({id: tenant.id, slug: tenant.slug});
    expect(findBySlug).toHaveBeenCalledWith('acme');
    expect(findById).toHaveBeenCalledWith(tenant.licenseId);
  });

  it('throws when tenant is missing', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();

    findBySlug.mockResolvedValue(null);

    const guard = new TenantGuard(tenantRepository, licenseRepository);
    const request = {headers: {host: 'missing.example.com'}} as TenantRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toBeInstanceOf(TenantNotFoundException);
    expect(findById).not.toHaveBeenCalled();
  });

  it('throws when license is missing', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });

    findBySlug.mockResolvedValue(tenant);
    findById.mockResolvedValue(null);

    const guard = new TenantGuard(tenantRepository, licenseRepository);
    const request = {headers: {host: 'acme.example.com'}} as TenantRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toBeInstanceOf(LicenseNotFoundException);
  });

  it('throws when license is expired', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {repository: licenseRepository, findById} = createLicenseRepository();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });
    const license = LicenseEntity.create({
      id: tenant.licenseId,
      key: 'license-key',
      expiresAt: new Date(Date.now() - 60_000),
    });

    findBySlug.mockResolvedValue(tenant);
    findById.mockResolvedValue(license);

    const guard = new TenantGuard(tenantRepository, licenseRepository);
    const request = {headers: {host: 'acme.example.com'}} as TenantRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toBeInstanceOf(LicenseExpiredException);
  });
});
