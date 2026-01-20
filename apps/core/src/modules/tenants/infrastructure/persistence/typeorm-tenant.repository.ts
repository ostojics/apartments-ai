import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {ITenantRepository} from '../../domain/repositories/tenant.repository.interface';
import {TenantEntity} from '../../domain/tenant.entity';
import {TenantOrmEntity} from './tenant.entity';
import {TenantMapper} from '../mappers/tenant.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmTenantRepository implements ITenantRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<TenantOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(TenantOrmEntity);
  }

  async save(tenant: TenantEntity): Promise<void> {
    const persistenceModel = TenantMapper.toPersistence(tenant);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<TenantEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return TenantMapper.toDomain(record);
  }

  async findBySlug(slug: string): Promise<TenantEntity | null> {
    const record = await this.repository.findOne({where: {slug}});
    if (!record) return null;

    return TenantMapper.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({where: {id}});
    return count > 0;
  }
}
