import {BuildingEntity} from 'src/modules/buildings/domain/building.entity';

export interface IBuildingInformationBuildingsRepositoryPort {
  findBySlug(tenantId: string, buildingSlug: string): Promise<BuildingEntity | null>;
}
