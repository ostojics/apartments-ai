import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {TenantCheckQuery} from '../queries/tenant-check.query';
import {
  TENANT_REPOSITORY,
  ITenantRepository,
} from 'src/modules/tenants/domain/repositories/tenant.repository.interface';
import {
  ILicenseRepository,
  LICENSE_REPOSITORY,
} from 'src/modules/licenses/domain/repositories/license.repository.interface';
import {LicenseNotFoundError} from 'src/modules/licenses/domain/license.errors';
import {LOGGER} from '../ports/di-tokens';
import {LoggerPort} from '../ports/logger.port';
import {ANALYTICS_SERVICE} from 'src/modules/shared/application/analytics/di-tokens';
import {IAnalyticsService} from 'src/modules/shared/application/analytics/analytics.interface';

export interface TenantCheckResult {
  isValid: boolean;
  tenant: {id: string; slug: string; name: string} | null;
}

@QueryHandler(TenantCheckQuery)
export class TenantCheckHandler implements IQueryHandler<TenantCheckQuery, TenantCheckResult> {
  constructor(
    @Inject(TENANT_REPOSITORY) private readonly tenantRepository: ITenantRepository,
    @Inject(LICENSE_REPOSITORY) private readonly licenseRepository: ILicenseRepository,
    @Inject(LOGGER) private readonly logger: LoggerPort,
    @Inject(ANALYTICS_SERVICE) private readonly analyticsService: IAnalyticsService,
  ) {}

  async execute(query: TenantCheckQuery): Promise<TenantCheckResult> {
    const tenant = await this.tenantRepository.findBySlug(query.slug);
    if (!tenant) {
      return {isValid: false, tenant: null};
    }

    const license = await this.licenseRepository.findById(tenant.licenseId);
    if (!license) {
      const err = new LicenseNotFoundError(tenant.licenseId);
      this.logger.debug(`License not found for tenant ${tenant.id} with license ID ${tenant.licenseId}`, err);
      this.analyticsService.captureException(err, 'tenant_check_handler', {
        tenantId: tenant.id,
        licenseId: tenant.licenseId,
      });

      throw err;
    }

    const isValid = license.isValid();

    return {
      isValid,
      tenant: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
      },
    };
  }
}
