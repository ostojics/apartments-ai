import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {LicenseExpiredException} from 'src/libs/domain/exceptions/license.exception';
import {TenantNotFoundException} from 'src/libs/domain/exceptions/tenant.exception';
import {
  ILicenseRepository,
  LICENSE_REPOSITORY,
} from 'src/modules/licenses/domain/repositories/license.repository.interface';
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
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<TenantRequest>();
    const tenantSlug = this.extractTenantSlug(request.headers.host);

    if (!tenantSlug) {
      throw new TenantNotFoundException();
    }

    const tenant = await this.tenantRepository.findBySlug(tenantSlug);

    if (!tenant) {
      throw new TenantNotFoundException(tenantSlug);
    }

    const license = await this.licenseRepository.findById(tenant.licenseId);

    if (!license || license.isExpired) {
      throw new LicenseExpiredException(tenant.licenseId);
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
