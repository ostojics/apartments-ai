import {LicenseEntity} from '../license.entity';

export const LICENSE_REPOSITORY = Symbol('LICENSE_REPOSITORY');

export interface ILicenseRepository {
  create(license: LicenseEntity): Promise<void>;
  findById(id: string): Promise<LicenseEntity | null>;
  findByKey(key: string): Promise<LicenseEntity | null>;
  findByHouseholdId(householdId: string): Promise<LicenseEntity | null>;
  update(license: LicenseEntity): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
