import {Injectable} from '@nestjs/common';
import {IBuildingInformationBuildingsRepositoryPort} from '../../../building-information/application/ports/building-information.buildings.repository.port';
import {BuildingEntity} from 'src/modules/buildings/domain/building.entity';
import {IBuildingRepository} from 'src/modules/buildings/domain/repositories/building.repository.interface';

@Injectable()
export class BuildingInformationBuildingsRepositoryAdapter implements IBuildingInformationBuildingsRepositoryPort {
  constructor(private readonly buildingRepository: IBuildingRepository) {}

  async findBySlug(tenantId: string, buildingSlug: string): Promise<BuildingEntity | null> {
    return await this.buildingRepository.findBySlug(tenantId, buildingSlug);
  }
}
