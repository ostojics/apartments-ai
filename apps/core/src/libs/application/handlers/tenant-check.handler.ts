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

export interface TenantCheckResult {
  isValid: boolean;
  tenant: {id: string; slug: string; name: string} | null;
}

@QueryHandler(TenantCheckQuery)
export class TenantCheckHandler implements IQueryHandler<TenantCheckQuery, TenantCheckResult> {
  constructor(
    @Inject(TENANT_REPOSITORY) private readonly tenantRepository: ITenantRepository,
    @Inject(LICENSE_REPOSITORY) private readonly licenseRepository: ILicenseRepository,
  ) {}

  async execute(query: TenantCheckQuery): Promise<TenantCheckResult> {
    const tenant = await this.tenantRepository.findBySlug(query.slug);
    if (!tenant) {
      return {isValid: false, tenant: null};
    }

    const license = await this.licenseRepository.findById(tenant.licenseId);
    const isValid = license?.isValid() ?? false;

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
