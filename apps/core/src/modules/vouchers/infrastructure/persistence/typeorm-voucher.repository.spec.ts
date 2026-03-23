import {TypeOrmVoucherRepository} from './typeorm-voucher.repository';
import {VoucherEntity} from '../../domain/voucher.entity';
import {ITransactionContext} from 'src/libs/application/ports/transaction-context.port';

describe('TypeOrmVoucherRepository', () => {
  const createRepository = () => {
    const save = jest.fn();
    const findOne = jest.fn();
    const find = jest.fn();
    const update = jest.fn();

    const dataSource = {
      manager: {
        getRepository: jest.fn().mockReturnValue({
          save,
          findOne,
          find,
          update,
        }),
      },
    };

    const transactionContext = {
      getManager: jest.fn().mockReturnValue(null),
      runWithManager: jest.fn(),
    } as unknown as ITransactionContext;

    const repository = new TypeOrmVoucherRepository(dataSource as never, transactionContext);

    return {repository, save, findOne, find, update};
  };

  it('saves voucher', async () => {
    const {repository, save} = createRepository();
    const voucher = VoucherEntity.create({
      code: 'HV-AAAA-BBBB',
      discountPercent: 10,
      expiresAt: new Date('2030-01-01T00:00:00.000Z'),
      tenantId: 'tenant-1',
    });

    await repository.save(voucher);

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('gets by code', async () => {
    const {repository, findOne} = createRepository();
    findOne.mockResolvedValue({
      id: 'voucher-id',
      code: 'HV-AAAA-BBBB',
      discountPercent: 10,
      expiresAt: new Date('2030-01-01T00:00:00.000Z'),
      status: 'issued',
      email: 'a@example.com',
      tenantId: 'tenant-1',
      metadata: {},
      redeemedAt: null,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    });

    const result = await repository.getByCode('HV-AAAA-BBBB');

    expect(result?.code).toBe('HV-AAAA-BBBB');
  });

  it('finds expired', async () => {
    const {repository, find} = createRepository();
    find.mockResolvedValue([]);

    await repository.findExpired(new Date('2026-01-01T00:00:00.000Z'));

    expect(find).toHaveBeenCalledTimes(1);
  });

  it('marks redeemed atomically', async () => {
    const {repository, update} = createRepository();
    update.mockResolvedValue({affected: 1});

    const result = await repository.markRedeemed('HV-AAAA-BBBB');

    expect(result).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });
});
