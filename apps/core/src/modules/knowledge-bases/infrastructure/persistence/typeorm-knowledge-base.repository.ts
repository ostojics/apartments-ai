import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IKnowledgeBaseRepository} from '../../domain/repositories/knowledge-base.repository.interface';
import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';
import {KnowledgeBaseOrmEntity} from './knowledge-base.entity';
import {KnowledgeBaseMapper} from '../mappers/knowledge-base.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmKnowledgeBaseRepository
  extends TypeOrmBaseRepository<KnowledgeBaseOrmEntity>
  implements IKnowledgeBaseRepository
{
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, KnowledgeBaseOrmEntity, transactionContext);
  }

  async save(knowledgeBase: KnowledgeBaseEntity): Promise<void> {
    const persistenceModel = KnowledgeBaseMapper.toPersistence(knowledgeBase);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<KnowledgeBaseEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return KnowledgeBaseMapper.toDomain(record);
  }

  async findByBuildingId(buildingId: string): Promise<KnowledgeBaseEntity | null> {
    const record = await this.repository.findOne({where: {buildingId}});
    if (!record) return null;

    return KnowledgeBaseMapper.toDomain(record);
  }

  async findByBuildingIdAndTenantId(buildingId: string, tenantId: string): Promise<KnowledgeBaseEntity | null> {
    const record = await this.repository.findOne({where: {buildingId, tenantId}});
    if (!record) return null;

    return KnowledgeBaseMapper.toDomain(record);
  }

  async findByTenantId(tenantId: string): Promise<KnowledgeBaseEntity | null> {
    const record = await this.repository.findOne({where: {tenantId}});
    if (!record) return null;

    return KnowledgeBaseMapper.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({where: {id}});
    return count > 0;
  }
}
