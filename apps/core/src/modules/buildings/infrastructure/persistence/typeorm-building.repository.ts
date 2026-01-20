import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IBuildingRepository} from '../../domain/repositories/building.repository.interface';
import {BuildingEntity} from '../../domain/building.entity';
import {BuildingOrmEntity} from './building.entity';
import {BuildingMapper} from '../mappers/building.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmBuildingRepository implements IBuildingRepository {
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

  async save(building: BuildingEntity): Promise<void> {
    const persistenceModel = BuildingMapper.toPersistence(building);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<BuildingEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return BuildingMapper.toDomain(record);
  }

  async findBySlug(tenantId: string, slug: string): Promise<BuildingEntity | null> {
    const record = await this.repository.findOne({where: {tenantId, slug}});
    if (!record) return null;

    return BuildingMapper.toDomain(record);
  }

  async findByTenantId(tenantId: string): Promise<BuildingEntity[]> {
    const records = await this.repository.find({where: {tenantId}});
    return records.map((record) => BuildingMapper.toDomain(record));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({where: {id}});
    return count > 0;
  }
}
