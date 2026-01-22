import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IBuildingInformationRepository} from '../../domain/repositories/building-information.repository.interface';
import {BuildingInformationEntity} from '../../domain/building-information.entity';
import {BuildingInformationOrmEntity} from './building-information.entity';
import {BuildingInformationMapper} from '../mappers/building-information.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmBuildingInformationRepository implements IBuildingInformationRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<BuildingInformationOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(BuildingInformationOrmEntity);
  }

  async save(information: BuildingInformationEntity): Promise<void> {
    const persistenceModel = BuildingInformationMapper.toPersistence(information);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<BuildingInformationEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;
    return BuildingInformationMapper.toDomain(record);
  }

  async findByKnowledgeBaseId(knowledgeBaseId: string): Promise<BuildingInformationEntity[]> {
    const records = await this.repository.find({where: {knowledgeBaseId}});
    return records.map((record) => BuildingInformationMapper.toDomain(record));
  }

  async findByBuildingIdAndLocale(buildingId: string, locale: string): Promise<BuildingInformationEntity | null> {
    const record = await this.repository.findOne({where: {buildingId, locale}});
    if (!record) return null;
    return BuildingInformationMapper.toDomain(record);
  }
}
