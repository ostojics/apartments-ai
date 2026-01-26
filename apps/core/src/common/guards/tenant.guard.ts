import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {IncomingHttpHeaders} from 'http';
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
import {CustomHeaders} from '../enums/custom-headers';

export interface TenantInfo {
  id: string;
  slug: string;
}

export interface UserContext {
  locale: string;
}

export interface TenantRequest extends Request {
  tenant: TenantInfo;
  userContext: UserContext;
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
    const tenantSlug = this.extractTenantSlug(request.headers);
    const locale = request.headers['accept-language'] ?? 'en-US';

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
    request.userContext = {locale};

    return true;
  }

  private extractTenantSlug(headers: IncomingHttpHeaders): string | null {
    const customHeaderSlug = headers[CustomHeaders.TenantSlug];

    if (customHeaderSlug) {
      return String(customHeaderSlug);
    }

    if (headers.origin) {
      return this.slugFromUrl(headers.origin);
    }

    return null;
  }

  private slugFromUrl(rawUrl: string): string | null {
    try {
      // Add protocol if missing so URL class doesn't throw
      const normalized = rawUrl.includes('://') ? rawUrl : `http://${rawUrl}`;
      const url = new URL(normalized);
      const parts = url.hostname.split('.');
      return parts.length >= 2 ? parts[0] : null;
    } catch {
      return null;
    }
  }
}
