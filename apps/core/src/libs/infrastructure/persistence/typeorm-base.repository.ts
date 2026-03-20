import {DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository} from 'typeorm';
import {ITransactionContext} from 'src/libs/application/ports/transaction-context.port';

export abstract class TypeOrmBaseRepository<T extends ObjectLiteral> {
  constructor(
    protected readonly dataSource: DataSource,
    protected readonly entityTarget: EntityTarget<T>,
    protected readonly transactionContext: ITransactionContext,
  ) {}

  protected get manager(): EntityManager {
    const transactionManager = this.transactionContext.getManager();
    return transactionManager ?? this.dataSource.manager;
  }

  protected get repository(): Repository<T> {
    return this.manager.getRepository(this.entityTarget);
  }
}
