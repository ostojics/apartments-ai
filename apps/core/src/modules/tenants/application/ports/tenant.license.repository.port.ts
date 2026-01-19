import {LicenseEntity} from 'src/modules/licenses/domain/license.entity';

export interface ITenantLicenseRepositoryPort {
  findById(licenseId: string): Promise<LicenseEntity | null>;
}
