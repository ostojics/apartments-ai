import {Job} from 'bullmq';
import {EmailJobs} from 'src/common/enums/jobs.enum';
import {IUnitOfWork} from 'src/libs/application/ports/unit-of-work.port';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {IEmailService} from '../../application/emails/email.service.interface';
import {IDeadLetterRepository} from '../../domain/dead-letter/dead-letter.repository.interface';
import {OutboxEntity} from '../../domain/outbox/outbox.entity';
import {IOutboxRepository} from '../../domain/outbox/outbox.repository.interface';
import {VoucherEmailProcessor} from './voucher-email.processor';

describe('VoucherEmailProcessor', () => {
  const createProcessor = () => {
    const emailService: jest.Mocked<IEmailService> = {
      sendEmail: jest.fn(),
    };

    const outboxRepository: jest.Mocked<IOutboxRepository> = {
      save: jest.fn(),
      findById: jest.fn(),
      findPendingToQueue: jest.fn(),
      deleteSentOlderThan: jest.fn(),
    };

    const deadLetterRepository: jest.Mocked<IDeadLetterRepository> = {
      save: jest.fn(),
    };

    const logger: jest.Mocked<ILoggerPort> = {
      log: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    const unitOfWork: IUnitOfWork = {
      runInTransaction: async <T>(work: () => Promise<T>) => work(),
    };

    const processor = new VoucherEmailProcessor(
      emailService,
      outboxRepository,
      deadLetterRepository,
      logger,
      unitOfWork,
    );

    return {processor, outboxRepository, deadLetterRepository, logger};
  };

  const buildOutbox = () =>
    OutboxEntity.create({
      id: 'outbox-1',
      jobType: String(EmailJobs.SEND_VOUCHER_EMAIL),
      payload: {
        email: 'jamie@example.com',
        voucherCode: 'SAVE10',
        discountPercent: 10,
        expiresAt: '2026-01-31T00:00:00.000Z',
      },
      tenantId: 'tenant-1',
      status: 'queued',
    });

  it('stores dead letter when attempts reach 5', async () => {
    const {processor, outboxRepository, deadLetterRepository} = createProcessor();
    const outbox = buildOutbox();
    const error = new Error('provider timeout');
    const saveSpy = jest.spyOn(deadLetterRepository, 'save');

    outboxRepository.findById.mockResolvedValue(outbox);

    const job = {
      id: 'job-1',
      name: String(EmailJobs.SEND_VOUCHER_EMAIL),
      attemptsMade: 5,
      data: {outboxId: outbox.id},
    } as Job<{outboxId: string}>;

    await processor.onFailed(job, error);

    expect(saveSpy).toHaveBeenCalledTimes(1);

    const savedDeadLetter = saveSpy.mock.calls[0]?.[0];
    expect(savedDeadLetter.outboxId).toBe(outbox.id);
    expect(savedDeadLetter.jobType).toBe(outbox.jobType);
    expect(savedDeadLetter.tenantId).toBe(outbox.tenantId);
    expect(savedDeadLetter.attempts).toBe(5);
    expect(savedDeadLetter.error).toBe(error.message);
  });

  it('does not store dead letter before final attempt', async () => {
    const {processor, outboxRepository, deadLetterRepository} = createProcessor();
    const outbox = buildOutbox();
    const saveSpy = jest.spyOn(deadLetterRepository, 'save');

    outboxRepository.findById.mockResolvedValue(outbox);

    const job = {
      id: 'job-1',
      name: String(EmailJobs.SEND_VOUCHER_EMAIL),
      attemptsMade: 4,
      data: {outboxId: outbox.id},
    } as Job<{outboxId: string}>;

    await processor.onFailed(job, new Error('provider timeout'));

    expect(saveSpy).not.toHaveBeenCalled();
  });
});
