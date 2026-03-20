import {DataSource, EntityManager, EntityTarget, Repository} from 'typeorm';

import {TypeOrmTransactionContext} from './typeorm-transaction-context';
import {TypeOrmUnitOfWork} from './typeorm-unit-of-work';
import {TypeOrmBaseRepository} from './typeorm-base.repository';

class ContactOrmEntity {
  id!: string;
}

class FeedbackOrmEntity {
  id!: string;
}

class ContactTestRepository extends TypeOrmBaseRepository<ContactOrmEntity> {
  constructor(dataSource: DataSource, transactionContext: TypeOrmTransactionContext) {
    super(dataSource, ContactOrmEntity, transactionContext);
  }

  async save(id: string): Promise<void> {
    await this.repository.save({id});
  }
}

class FeedbackTestRepository extends TypeOrmBaseRepository<FeedbackOrmEntity> {
  constructor(dataSource: DataSource, transactionContext: TypeOrmTransactionContext) {
    super(dataSource, FeedbackOrmEntity, transactionContext);
  }

  async save(id: string): Promise<void> {
    await this.repository.save({id});
  }
}

interface InMemoryState {
  contacts: string[];
  feedback: string[];
}

describe('TypeOrmUnitOfWork + TypeOrmBaseRepository', () => {
  const createDataSource = () => {
    const committed: InMemoryState = {
      contacts: [],
      feedback: [],
    };

    const createManager = (state: InMemoryState): EntityManager => {
      const getRepository = <T extends ContactOrmEntity | FeedbackOrmEntity>(
        entityTarget: EntityTarget<T>,
      ): Repository<T> => {
        if (entityTarget === ContactOrmEntity) {
          return {
            save: (entity: T): Promise<T> => {
              state.contacts.push(entity.id);
              return Promise.resolve(entity);
            },
          } as unknown as Repository<T>;
        }

        if (entityTarget === FeedbackOrmEntity) {
          return {
            save: (entity: T): Promise<T> => {
              state.feedback.push(entity.id);
              return Promise.resolve(entity);
            },
          } as unknown as Repository<T>;
        }

        throw new Error('Unknown entity target');
      };

      return {
        getRepository,
      } as unknown as EntityManager;
    };

    const dataSource = {
      manager: createManager(committed),
      transaction: async <T>(work: (manager: EntityManager) => Promise<T>): Promise<T> => {
        const pending: InMemoryState = {
          contacts: [],
          feedback: [],
        };

        const result = await work(createManager(pending));
        committed.contacts.push(...pending.contacts);
        committed.feedback.push(...pending.feedback);
        return result;
      },
    } as unknown as DataSource;

    return {
      dataSource,
      committed,
    };
  };

  it('uses transaction-bound manager across repositories inside runInTransaction', async () => {
    const {dataSource, committed} = createDataSource();
    const transactionContext = new TypeOrmTransactionContext();
    const unitOfWork = new TypeOrmUnitOfWork(dataSource, transactionContext);
    const contactRepository = new ContactTestRepository(dataSource, transactionContext);
    const feedbackRepository = new FeedbackTestRepository(dataSource, transactionContext);

    await unitOfWork.runInTransaction(async () => {
      expect(transactionContext.getManager()).not.toBeNull();

      await contactRepository.save('contact-1');
      await feedbackRepository.save('feedback-1');
    });

    expect(committed.contacts).toEqual(['contact-1']);
    expect(committed.feedback).toEqual(['feedback-1']);
  });

  it('rolls back all repository writes when one operation fails', async () => {
    const {dataSource, committed} = createDataSource();
    const transactionContext = new TypeOrmTransactionContext();
    const unitOfWork = new TypeOrmUnitOfWork(dataSource, transactionContext);
    const contactRepository = new ContactTestRepository(dataSource, transactionContext);
    const feedbackRepository = new FeedbackTestRepository(dataSource, transactionContext);

    await expect(
      unitOfWork.runInTransaction(async () => {
        await contactRepository.save('contact-rollback');
        await feedbackRepository.save('feedback-rollback');
        throw new Error('forced failure');
      }),
    ).rejects.toThrow('forced failure');

    expect(committed.contacts).toEqual([]);
    expect(committed.feedback).toEqual([]);
  });

  it('falls back to dataSource.manager outside transaction context', async () => {
    const {dataSource, committed} = createDataSource();
    const transactionContext = new TypeOrmTransactionContext();
    const contactRepository = new ContactTestRepository(dataSource, transactionContext);

    expect(transactionContext.getManager()).toBeNull();

    await contactRepository.save('contact-outside-transaction');

    expect(committed.contacts).toEqual(['contact-outside-transaction']);
  });
});
