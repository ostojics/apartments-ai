import {ITransactionContext} from 'src/libs/application/ports/transaction-context.port';
import {DeadLetterEntity} from '../../domain/dead-letter/dead-letter.entity';
import {TypeOrmDeadLetterRepository} from './typeorm-dead-letter.repository';

describe('TypeOrmDeadLetterRepository', () => {
  const createRepository = () => {
    const save = jest.fn();

    const dataSource = {
      manager: {
        getRepository: jest.fn().mockReturnValue({
          save,
        }),
      },
    };

    const transactionContext = {
      getManager: jest.fn().mockReturnValue(null),
      runWithManager: jest.fn(),
    } as unknown as ITransactionContext;

    const repository = new TypeOrmDeadLetterRepository(dataSource as never, transactionContext);

    return {repository, save};
  };

  it('saves dead-letter row', async () => {
    const {repository, save} = createRepository();

    const deadLetter = DeadLetterEntity.create({
      outboxId: 'outbox-1',
      jobType: 'send-voucher-email',
      payload: {email: 'jamie@example.com'},
      tenantId: 'tenant-1',
      error: 'provider timeout',
      attempts: 5,
    });

    await repository.save(deadLetter);

    expect(save).toHaveBeenCalledTimes(1);
  });
});
