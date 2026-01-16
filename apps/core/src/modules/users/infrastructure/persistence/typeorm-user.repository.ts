import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IUserRepository} from '../../domain/repositories/user.repository.interface';
import {UserEntity} from '../../domain/user.entity';
import {UserOrmEntity} from './user.entity';
import {UserMapper} from './user.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<UserOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(UserOrmEntity);
  }

  async create(user: UserEntity): Promise<void> {
    const persistenceModel = UserMapper.toPersistence(user);
    await this.repository.save(persistenceModel);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.repository.findOne({where: {email}});
    return record ? UserMapper.toDomain(record) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    return record ? UserMapper.toDomain(record) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const record = await this.repository.findOne({where: {username}});
    return record ? UserMapper.toDomain(record) : null;
  }

  async update(user: UserEntity): Promise<void> {
    const persistenceModel = UserMapper.toPersistence(user);
    await this.repository.save(persistenceModel);
  }
}
