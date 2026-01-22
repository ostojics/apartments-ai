import {Injectable} from '@nestjs/common';
import {ITenantLicenseRepositoryPort} from '../../application/ports/tenant.license.repository.port';
import {LicenseEntity} from 'src/modules/licenses/domain/license.entity';
import {ILicenseRepository} from 'src/modules/licenses/domain/repositories/license.repository.interface';

@Injectable()
export class TenantLicenseRepositoryAdapter implements ITenantLicenseRepositoryPort {
  constructor(private readonly licenseRepository: ILicenseRepository) {}

  async findById(licenseId: string): Promise<LicenseEntity | null> {
    return this.licenseRepository.findById(licenseId);
  }
}
