import {Injectable} from '@nestjs/common';
import {IBuildingInformationBuildingsRepositoryPort} from '../../application/ports/building-information.buildings.repository.port';
import {BuildingEntity} from 'src/modules/buildings/domain/building.entity';
import {DataSource, Repository} from 'typeorm';
import {BuildingOrmEntity} from 'src/modules/buildings/infrastructure/persistence/building.entity';
import {BuildingMapper} from 'src/modules/buildings/infrastructure/mappers/building.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class BuildingInformationBuildingsRepositoryAdapter implements IBuildingInformationBuildingsRepositoryPort {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<BuildingOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(BuildingOrmEntity);
  }

  async findBySlug(tenantId: string, buildingSlug: string): Promise<BuildingEntity | null> {
    const record = await this.repository.findOne({where: {tenantId, slug: buildingSlug}});
    if (!record) return null;

    return BuildingMapper.toDomain(record);
  }
}
