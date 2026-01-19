import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IKnowledgeBaseRepository} from '../../domain/repositories/knowledge-base.repository.interface';
import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';
import {KnowledgeBaseOrmEntity} from './knowledge-base.entity';
import {KnowledgeBaseMapper} from '../mappers/knowledge-base.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmKnowledgeBaseRepository implements IKnowledgeBaseRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<KnowledgeBaseOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(KnowledgeBaseOrmEntity);
  }

  async create(knowledgeBase: KnowledgeBaseEntity): Promise<void> {
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

  async findByTenantId(tenantId: string): Promise<KnowledgeBaseEntity | null> {
    const record = await this.repository.findOne({where: {tenantId}});
    if (!record) return null;

    return KnowledgeBaseMapper.toDomain(record);
  }

  async update(knowledgeBase: KnowledgeBaseEntity): Promise<void> {
    const persistenceModel = KnowledgeBaseMapper.toPersistence(knowledgeBase);
    await this.repository.save(persistenceModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({where: {id}});
    return count > 0;
  }
}
