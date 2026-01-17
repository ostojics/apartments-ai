import {BuildingEntity} from '../building.entity';

export const BUILDING_REPOSITORY = Symbol('BUILDING_REPOSITORY');

export interface IBuildingRepository {
  create(building: BuildingEntity): Promise<void>;
  findById(id: string): Promise<BuildingEntity | null>;
  findBySlug(tenantId: string, slug: string): Promise<BuildingEntity | null>;
  findByTenantId(tenantId: string): Promise<BuildingEntity[]>;
  update(building: BuildingEntity): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
