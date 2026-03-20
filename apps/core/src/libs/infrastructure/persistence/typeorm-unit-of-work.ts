import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IUnitOfWork} from '../../application/ports/unit-of-work.port';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmUnitOfWork implements IUnitOfWork {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(TRANSACTION_CONTEXT) private readonly transactionContext: ITransactionContext,
  ) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return await this.dataSource.transaction(async (manager) => {
      return await this.transactionContext.runWithManager(manager, work);
    });
  }
}
