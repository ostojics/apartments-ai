import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IBuildingRepository} from '../../domain/repositories/building.repository.interface';
import {BuildingEntity} from '../../domain/building.entity';
import {BuildingOrmEntity} from './building.entity';
import {BuildingMapper} from '../mappers/building.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmBuildingRepository extends TypeOrmBaseRepository<BuildingOrmEntity> implements IBuildingRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, BuildingOrmEntity, transactionContext);
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
