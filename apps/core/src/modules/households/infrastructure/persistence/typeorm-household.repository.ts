import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IHouseholdRepository} from '../../domain/repositories/household.repository.interface';
import {HouseholdEntity} from '../../domain/household.entity';
import {HouseholdOrmEntity} from './household.entity';
import {HouseholdMapper} from './household.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';
import {UserOrmEntity} from 'src/modules/users/infrastructure/persistence/user.entity';

@Injectable()
export class TypeOrmHouseholdRepository implements IHouseholdRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<HouseholdOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(HouseholdOrmEntity);
  }

  async create(household: HouseholdEntity): Promise<void> {
    const persistenceModel = HouseholdMapper.toPersistence(household);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<HouseholdEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    return record ? HouseholdMapper.toDomain(record) : null;
  }

  async findByAuthorId(authorId: string): Promise<HouseholdEntity | null> {
    const manager = TypeOrmUnitOfWork.getManager() ?? this.dataSource.manager;
    const userRepository = manager.getRepository(UserOrmEntity);

    const user = await userRepository.findOne({
      where: {id: authorId, isHouseholdAuthor: true},
    });

    if (!user) {
      return null;
    }

    const record = await this.repository.findOne({where: {id: user.householdId}});
    return record ? HouseholdMapper.toDomain(record) : null;
  }

  async update(household: HouseholdEntity): Promise<void> {
    const persistenceModel = HouseholdMapper.toPersistence(household);
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
