import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {ILicenseRepository} from '../../domain/repositories/license.repository.interface';
import {LicenseEntity} from '../../domain/license.entity';
import {LicenseOrmEntity} from './license.entity';
import {LicenseMapper} from './license.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmLicenseRepository implements ILicenseRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<LicenseOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(LicenseOrmEntity);
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
