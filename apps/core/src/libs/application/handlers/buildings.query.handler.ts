import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {BuildingsQuery} from '../queries/buildings.query';
import {
  BUILDING_REPOSITORY,
  IBuildingRepository,
} from 'src/modules/buildings/domain/repositories/building.repository.interface';

export interface BuildingSummary {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  imageUrl: string | null;
  address: string | null;
}

@QueryHandler(BuildingsQuery)
export class BuildingsHandler implements IQueryHandler<BuildingsQuery, BuildingSummary[]> {
  constructor(@Inject(BUILDING_REPOSITORY) private readonly buildingRepository: IBuildingRepository) {}

  async execute(query: BuildingsQuery): Promise<BuildingSummary[]> {
    const buildings = await this.buildingRepository.findByTenantId(query.tenantId);
    return buildings.map((building) => ({
      id: building.id,
      name: building.name,
      slug: building.slug,
      tenantId: building.tenantId,
      imageUrl: building.imageUrl,
      address: building.address,
    }));
  }
}
