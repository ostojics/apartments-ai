import {LicenseEntity} from 'src/modules/licenses/domain/license.entity';

export const HOUSEHOLD_LICENSE_REPOSITORY_PORT = Symbol('HOUSEHOLD_LICENSE_REPOSITORY_PORT');

export interface IHouseholdLicenseRepositoryPort {
  findByKey(key: string): Promise<LicenseEntity | null>;
  save(license: LicenseEntity): Promise<void>;
}
