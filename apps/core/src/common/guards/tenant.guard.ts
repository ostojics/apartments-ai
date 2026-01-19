import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {LicenseExpiredException, LicenseNotFoundException} from 'src/libs/domain/exceptions/license.exception';
import {TenantNotFoundException} from 'src/libs/domain/exceptions/tenant.exception';
import {
  ILicenseRepository,
  LICENSE_REPOSITORY,
} from 'src/modules/licenses/domain/repositories/license.repository.interface';
import {IAnalyticsService} from 'src/modules/shared/application/analytics/analytics.interface';
import {ANALYTICS_SERVICE} from 'src/modules/shared/application/analytics/di-tokens';
import {
  ITenantRepository,
  TENANT_REPOSITORY,
} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';

export interface TenantInfo {
  id: string;
  slug: string;
}

export interface TenantRequest extends Request {
  tenant: TenantInfo;
}

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @Inject(TENANT_REPOSITORY) private readonly tenantRepository: ITenantRepository,
    @Inject(LICENSE_REPOSITORY) private readonly licenseRepository: ILicenseRepository,
    @Inject(ANALYTICS_SERVICE) private readonly analyticsService: IAnalyticsService,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<TenantRequest>();
    const tenantSlug = this.extractTenantSlug(request.headers.host);

    if (!tenantSlug) {
      this.logger.debug('TenantGuard: No tenant slug found in host header', request.headers);
      throw new TenantNotFoundException();
    }

    const tenant = await this.tenantRepository.findBySlug(tenantSlug);
    if (!tenant) {
      const err = new TenantNotFoundException(tenantSlug);
      this.analyticsService.captureException(err, 'tenant_guard', {tenantSlug});
      this.logger.debug(`TenantGuard: Tenant not found for slug ${tenantSlug}`, err);

      throw err;
    }

    const license = await this.licenseRepository.findById(tenant.licenseId);
    if (!license) {
      const err = new LicenseNotFoundException(tenant.licenseId);
      this.analyticsService.captureException(err, 'tenant_guard', {tenantId: tenant.id, licenseId: tenant.licenseId});
      this.logger.debug(`TenantGuard: License not found for id ${tenant.licenseId}`, err);

      throw err;
    }

    if (license.isExpired) {
      const err = new LicenseExpiredException(tenant.licenseId);
      this.analyticsService.captureException(err, 'tenant_guard', {tenantId: tenant.id, licenseId: tenant.licenseId});
      this.logger.debug(`TenantGuard: License expired for id ${tenant.licenseId}`, err);

      throw err;
    }

    request.tenant = {id: tenant.id, slug: tenant.slug};

    return true;
  }

  private extractTenantSlug(host?: string): string | null {
    if (!host) {
      return null;
    }

    const hostname = host.split(':')[0]?.trim();

    if (!hostname) {
      return null;
    }

    const parts = hostname.split('.').filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return parts[0];
  }
}
