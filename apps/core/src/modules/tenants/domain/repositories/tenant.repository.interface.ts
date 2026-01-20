import {TenantEntity} from '../tenant.entity';

export const TENANT_REPOSITORY = Symbol('TENANT_REPOSITORY');

export interface ITenantRepository {
  save(tenant: TenantEntity): Promise<void>;
  findById(id: string): Promise<TenantEntity | null>;
  findBySlug(slug: string): Promise<TenantEntity | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
