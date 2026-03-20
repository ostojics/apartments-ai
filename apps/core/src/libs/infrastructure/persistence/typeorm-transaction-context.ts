import {Injectable} from '@nestjs/common';
import {AsyncLocalStorage} from 'async_hooks';
import {EntityManager} from 'typeorm';
import {ITransactionContext} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmTransactionContext implements ITransactionContext {
  private readonly storage = new AsyncLocalStorage<EntityManager>();

  getManager(): EntityManager | null {
    return this.storage.getStore() ?? null;
  }

  runWithManager<T>(manager: EntityManager, work: () => Promise<T>): Promise<T> {
    return this.storage.run(manager, work);
  }
}
