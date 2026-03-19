import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IBuildingInformationRepository} from '../../domain/repositories/building-information.repository.interface';
import {BuildingInformationEntity} from '../../domain/building-information.entity';
import {BuildingInformationOrmEntity} from './building-information.entity';
import {BuildingInformationMapper} from '../mappers/building-information.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmBuildingInformationRepository
  extends TypeOrmBaseRepository<BuildingInformationOrmEntity>
  implements IBuildingInformationRepository
{
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, BuildingInformationOrmEntity, transactionContext);
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
