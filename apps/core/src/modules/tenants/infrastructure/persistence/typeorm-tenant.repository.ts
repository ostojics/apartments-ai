import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {ITenantRepository} from '../../domain/repositories/tenant.repository.interface';
import {TenantEntity} from '../../domain/tenant.entity';
import {TenantOrmEntity} from './tenant.entity';
import {TenantMapper} from '../mappers/tenant.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmTenantRepository extends TypeOrmBaseRepository<TenantOrmEntity> implements ITenantRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, TenantOrmEntity, transactionContext);
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
