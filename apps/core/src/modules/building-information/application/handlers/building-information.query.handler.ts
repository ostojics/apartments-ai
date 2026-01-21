import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {BuildingInformationQuery} from '../queries/building-information.query';
import {
  BUILDING_INFORMATION_REPOSITORY,
  IBuildingInformationRepository,
} from 'src/modules/building-information/domain/repositories/building-information.repository.interface';
import {
  BUILDING_REPOSITORY,
  IBuildingRepository,
} from 'src/modules/buildings/domain/repositories/building.repository.interface';

export interface BuildingInformationResult {
  content: string;
}

@QueryHandler(BuildingInformationQuery)
export class BuildingInformationHandler implements IQueryHandler<
  BuildingInformationQuery,
  BuildingInformationResult | null
> {
  constructor(
    @Inject(BUILDING_REPOSITORY) private readonly buildingRepository: IBuildingRepository,
    @Inject(BUILDING_INFORMATION_REPOSITORY)
    private readonly buildingInformationRepository: IBuildingInformationRepository,
  ) {}

  async execute(query: BuildingInformationQuery): Promise<BuildingInformationResult | null> {
    const building = await this.buildingRepository.findBySlug(query.tenantId, query.buildingSlug);
    if (!building) {
      return null;
    }

    const information = await this.buildingInformationRepository.findByBuildingIdAndLocale(building.id, query.locale);
    if (!information) {
      return null;
    }

    return {content: information.content};
  }
}
