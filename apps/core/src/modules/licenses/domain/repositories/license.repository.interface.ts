import {LicenseEntity} from '../license.entity';

export const LICENSE_REPOSITORY = Symbol('LICENSE_REPOSITORY');

export interface ILicenseRepository {
  save(license: LicenseEntity): Promise<void>;
  findById(id: string): Promise<LicenseEntity | null>;
  findByKey(key: string): Promise<LicenseEntity | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
