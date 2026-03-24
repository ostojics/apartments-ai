import {TypeOrmOutboxRepository} from './typeorm-outbox.repository';
import {OutboxEntity} from '../../domain/outbox/outbox.entity';
import {ITransactionContext} from 'src/libs/application/ports/transaction-context.port';

describe('TypeOrmOutboxRepository', () => {
  const createRepository = () => {
    const save = jest.fn();
    const findOne = jest.fn();
    const find = jest.fn();
    const createQueryBuilder = jest.fn();

    const deleteFn = jest.fn();
    const from = jest.fn();
    const where = jest.fn();
    const andWhere = jest.fn();
    const execute = jest.fn();

    createQueryBuilder.mockReturnValue({
      delete: deleteFn,
      from,
      where,
      andWhere,
      execute,
    });
    deleteFn.mockReturnValue({from, where, andWhere, execute});
    from.mockReturnValue({where, andWhere, execute});
    where.mockReturnValue({andWhere, execute});
    andWhere.mockReturnValue({execute});

    const dataSource = {
      manager: {
        getRepository: jest.fn().mockReturnValue({
          save,
          findOne,
          find,
          createQueryBuilder,
        }),
      },
    };

    const transactionContext = {
      getManager: jest.fn().mockReturnValue(null),
      runWithManager: jest.fn(),
    } as unknown as ITransactionContext;

    const repository = new TypeOrmOutboxRepository(dataSource as never, transactionContext);

    return {repository, save, findOne, find, execute, andWhere};
  };

  it('saves outbox row', async () => {
    const {repository, save} = createRepository();
    const outbox = OutboxEntity.create({
      jobType: 'send-voucher-email',
      payload: {to: 'jamie@example.com'},
      tenantId: 'tenant-1',
    });

    await repository.save(outbox);

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('finds outbox by id', async () => {
    const {repository, findOne} = createRepository();
    findOne.mockResolvedValue({
      id: 'outbox-1',
      jobType: 'send-voucher-email',
      payload: {to: 'jamie@example.com'},
      tenantId: 'tenant-1',
      status: 'pending',
      attempts: 0,
      sentAt: null,
      lastError: null,
      result: null,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    });

    const result = await repository.findById('outbox-1');

    expect(result?.id).toBe('outbox-1');
  });

  it('finds pending rows due now', async () => {
    const {repository, find} = createRepository();
    find.mockResolvedValue([]);

    await repository.findPendingToQueue(50);

    expect(find).toHaveBeenCalledTimes(1);
  });

  it('deletes sent rows older than cutoff', async () => {
    const {repository, execute, andWhere} = createRepository();
    execute.mockResolvedValue({affected: 3});

    const deleted = await repository.deleteSentOlderThan(new Date('2026-01-01T00:00:00.000Z'));

    expect(andWhere).toHaveBeenCalledWith('sent_at < :cutoff', {cutoff: new Date('2026-01-01T00:00:00.000Z')});
    expect(deleted).toBe(3);
  });
});
