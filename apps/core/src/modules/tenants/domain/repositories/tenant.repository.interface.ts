import {TenantEntity} from '../tenant.entity';

export const TENANT_REPOSITORY = Symbol('TENANT_REPOSITORY');

export interface ITenantRepository {
  create(tenant: TenantEntity): Promise<void>;
  findById(id: string): Promise<TenantEntity | null>;
  findBySlug(slug: string): Promise<TenantEntity | null>;
  update(tenant: TenantEntity): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
