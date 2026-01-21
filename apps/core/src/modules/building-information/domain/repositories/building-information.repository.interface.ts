import {BuildingInformationEntity} from '../building-information.entity';

export const BUILDING_INFORMATION_REPOSITORY = Symbol('BUILDING_INFORMATION_REPOSITORY');

export interface IBuildingInformationRepository {
  save(information: BuildingInformationEntity): Promise<void>;
  findById(id: string): Promise<BuildingInformationEntity | null>;
  findByKnowledgeBaseId(knowledgeBaseId: string): Promise<BuildingInformationEntity[]>;
  findByBuildingIdAndLocale(buildingId: string, locale: string): Promise<BuildingInformationEntity | null>;
}
