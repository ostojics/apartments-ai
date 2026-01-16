import {DataSource, EntityManager, EntityTarget, ObjectLiteral} from 'typeorm';
import {TypeOrmUnitOfWork} from './typeorm-unit-of-work';

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(
    protected readonly dataSource: DataSource,
    protected readonly entityTarget: EntityTarget<T>,
  ) {}

  protected get manager(): EntityManager {
    const transactionManager = TypeOrmUnitOfWork.getManager();
    return transactionManager ?? this.dataSource.manager;
  }
}
