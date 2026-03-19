import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {ILicenseRepository} from '../../domain/repositories/license.repository.interface';
import {LicenseEntity} from '../../domain/license.entity';
import {LicenseOrmEntity} from './license.entity';
import {LicenseMapper} from './license.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmLicenseRepository extends TypeOrmBaseRepository<LicenseOrmEntity> implements ILicenseRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, LicenseOrmEntity, transactionContext);
  }

  async save(license: LicenseEntity): Promise<void> {
    const persistenceModel = LicenseMapper.toPersistence(license);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<LicenseEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return LicenseMapper.toDomain(record);
  }

  async findByKey(key: string): Promise<LicenseEntity | null> {
    const record = await this.repository.findOne({where: {key}});
    if (!record) return null;

    return LicenseMapper.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({where: {id}});
    return count > 0;
  }
}
