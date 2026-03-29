import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {IJWTService, JwtPayload} from 'src/modules/shared/application/jwt/jwt.service.interface';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';
import {extractTenantSlug} from '../utils/extract-tenant-header';
import {
  ITenantRepository,
  TENANT_REPOSITORY,
} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';
import {TenantNotFoundException} from 'src/libs/domain/exceptions/tenant.exception';

export interface AuthenticatedRequest extends Request {
  userId: string;
  tenantSlug: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(TENANT_REPOSITORY) private readonly tenantRepository: ITenantRepository,
    @Inject(JWT_SERVICE) private readonly jwtService: IJWTService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/dot-notation
    const token: string | undefined = request.cookies['__session'];
    const tenantSlug = extractTenantSlug(request.headers);

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    if (!tenantSlug) {
      throw new TenantNotFoundException();
    }

    try {
      const [payload, tenant] = await Promise.all([
        this.jwtService.verifyJwtToken<JwtPayload & {metadata: {tenant: string}}>(token),
        this.tenantRepository.findBySlug(tenantSlug),
      ]);

      if (!tenant) {
        const err = new TenantNotFoundException(tenantSlug);
        this.logger.debug(`AuthGuard: Tenant not found for slug ${tenantSlug}`, err);

        throw err;
      }

      if (tenant.slug !== payload.metadata.tenant) {
        this.logger.warn('AuthGuard: Tenant slug in token does not match request', {
          tokenTenant: payload.metadata.tenant,
          requestTenant: tenantSlug,
        });
        throw new UnauthorizedException('Invalid authentication token');
      }

      request.userId = payload.sub;
      request.tenantSlug = tenant.slug;
    } catch (error) {
      this.logger.warn('AuthGuard: JWT verification failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw new UnauthorizedException('Invalid authentication token');
    }

    return true;
  }
}
