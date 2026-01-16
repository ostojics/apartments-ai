import {Injectable} from '@nestjs/common';
import {DataSource, EntityManager} from 'typeorm';
import {AsyncLocalStorage} from 'async_hooks';
import {IUnitOfWork} from '../../application/ports/unit-of-work.port';

@Injectable()
export class TypeOrmUnitOfWork implements IUnitOfWork {
  // Static ALS instance to share the manager across the execution context
  private static readonly storage = new AsyncLocalStorage<EntityManager>();

  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return await this.dataSource.transaction(async (manager) => {
      // 'run' ensures that any code inside 'work()' can access this 'manager'
      return await TypeOrmUnitOfWork.storage.run(manager, work);
    });
  }

  /**
   * Static helper for repositories to grab the current transactional manager
   */
  static getManager(): EntityManager | null {
    return this.storage.getStore() ?? null;
  }
}
