import {ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {CustomHeaders} from 'src/common/enums/custom-headers';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {TenantNotFoundException} from 'src/libs/domain/exceptions/tenant.exception';
import {IJWTService} from 'src/modules/shared/application/jwt/jwt.service.interface';
import {TenantEntity} from 'src/modules/tenants/domain/tenant.entity';
import {ITenantRepository} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';
import {AuthGuard, AuthenticatedRequest} from './auth.guard';

interface JwtPayloadWithTenant {
  sub: string;
  email: string;
  iss: string;
  iat: number;
  exp: number;
  metadata: {
    tenant: string;
  };
}

const createTenantRepository = () => {
  const findBySlug = jest.fn();
  const repository: ITenantRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findBySlug,
    delete: jest.fn(),
    exists: jest.fn(),
  };

  return {repository, findBySlug};
};

const createJwtService = () => {
  const verifyJwtToken = jest.fn();
  const service: IJWTService = {
    verifyJwtToken,
  };

  return {service, verifyJwtToken};
};

const createLogger = (): ILoggerPort => ({
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
});

const buildContext = (request: AuthenticatedRequest): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  }) as ExecutionContext;

const createPayload = (tenant: string): JwtPayloadWithTenant => ({
  sub: 'user-123',
  email: 'user@example.com',
  iss: 'issuer',
  iat: 1,
  exp: 2,
  metadata: {
    tenant,
  },
});

describe('AuthGuard', () => {
  it('authenticates request when origin contains valid tenant slug', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });

    verifyJwtToken.mockResolvedValue(createPayload('acme'));
    findBySlug.mockResolvedValue(tenant);

    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'valid-token'},
      headers: {origin: 'acme.example.com'},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).resolves.toBe(true);
    expect(verifyJwtToken).toHaveBeenCalledWith('valid-token');
    expect(findBySlug).toHaveBeenCalledWith('acme');
    expect(request.userId).toBe('user-123');
    expect(request.tenantSlug).toBe('acme');
  });

  it('authenticates request when tenant slug is provided via custom header', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });

    verifyJwtToken.mockResolvedValue(createPayload('acme'));
    findBySlug.mockResolvedValue(tenant);

    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'valid-token'},
      headers: {
        [CustomHeaders.TenantSlug]: 'acme',
        origin: 'different.example.com',
      },
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).resolves.toBe(true);
    expect(verifyJwtToken).toHaveBeenCalledWith('valid-token');
    expect(findBySlug).toHaveBeenCalledWith('acme');
    expect(request.userId).toBe('user-123');
    expect(request.tenantSlug).toBe('acme');
  });

  it('throws when authentication token is missing', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();
    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {},
      headers: {origin: 'acme.example.com'},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toThrow(
      new UnauthorizedException('No authentication token found'),
    );
    expect(verifyJwtToken).not.toHaveBeenCalled();
    expect(findBySlug).not.toHaveBeenCalled();
  });

  it('throws when tenant slug is missing in headers', async () => {
    const {repository: tenantRepository} = createTenantRepository();
    const {service: jwtService} = createJwtService();
    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'valid-token'},
      headers: {},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toBeInstanceOf(TenantNotFoundException);
  });

  it('throws unauthorized when tenant cannot be found', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();

    verifyJwtToken.mockResolvedValue(createPayload('acme'));
    findBySlug.mockResolvedValue(null);

    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'valid-token'},
      headers: {origin: 'acme.example.com'},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toThrow(
      new UnauthorizedException('Invalid authentication token'),
    );
  });

  it('throws unauthorized when JWT verification fails', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });

    verifyJwtToken.mockRejectedValue(new Error('jwt invalid'));
    findBySlug.mockResolvedValue(tenant);

    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'invalid-token'},
      headers: {origin: 'acme.example.com'},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toThrow(
      new UnauthorizedException('Invalid authentication token'),
    );
  });

  it('throws unauthorized when JWT tenant does not match resolved tenant', async () => {
    const {repository: tenantRepository, findBySlug} = createTenantRepository();
    const {service: jwtService, verifyJwtToken} = createJwtService();
    const tenant = TenantEntity.create({
      name: 'Acme',
      slug: 'acme',
      licenseId: 'license-123',
    });

    verifyJwtToken.mockResolvedValue(createPayload('another-tenant'));
    findBySlug.mockResolvedValue(tenant);

    const guard = new AuthGuard(createLogger(), tenantRepository, jwtService);
    const request = {
      cookies: {__session: 'valid-token'},
      headers: {origin: 'acme.example.com'},
    } as unknown as AuthenticatedRequest;

    await expect(guard.canActivate(buildContext(request))).rejects.toThrow(
      new UnauthorizedException('Invalid authentication token'),
    );
  });
});
