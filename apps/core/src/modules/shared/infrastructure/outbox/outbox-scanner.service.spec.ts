import {Queues} from 'src/common/enums/queues.enum';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {IQueueService} from '../../application/queue/queue.service.interface';
import {OutboxEntity} from '../../domain/outbox/outbox.entity';
import {IOutboxRepository} from '../../domain/outbox/outbox.repository.interface';
import {OutboxScannerService} from './outbox-scanner.service';

describe('OutboxScannerService', () => {
  const createService = () => {
    const outboxRepository: jest.Mocked<IOutboxRepository> = {
      save: jest.fn(),
      findById: jest.fn(),
      findPendingToQueue: jest.fn(),
      deleteSentOlderThan: jest.fn(),
    };

    const queueService: jest.Mocked<IQueueService> = {
      enqueue: jest.fn(),
    };

    const logger: jest.Mocked<ILoggerPort> = {
      log: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    const service = new OutboxScannerService(outboxRepository, queueService, logger);

    return {service, outboxRepository, queueService, logger};
  };

  it('enqueues pending outbox rows', async () => {
    const {service, outboxRepository, queueService} = createService();
    const enqueueSpy = jest.spyOn(queueService, 'enqueue');
    const saveSpy = jest.spyOn(outboxRepository, 'save');
    const outbox = OutboxEntity.create({
      id: 'outbox-1',
      jobType: 'send-voucher-email',
      payload: {email: 'jamie@example.com'},
      tenantId: 'tenant-1',
      status: 'pending',
    });

    outboxRepository.findPendingToQueue.mockResolvedValue([outbox]);
    queueService.enqueue.mockResolvedValue('job-1');

    await service.scanAndEnqueue();

    expect(enqueueSpy).toHaveBeenCalledWith(Queues.EMAILS, outbox.jobType, {outboxId: outbox.id}, {attempts: 5});
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it('deletes sent rows older than 7 days', async () => {
    const {service, outboxRepository, logger} = createService();
    const deleteSpy = jest.spyOn(outboxRepository, 'deleteSentOlderThan');
    const infoSpy = jest.spyOn(logger, 'info');
    jest.useFakeTimers().setSystemTime(new Date('2026-02-08T00:00:00.000Z'));
    outboxRepository.deleteSentOlderThan.mockResolvedValue(2);

    await service.cleanupSentOutbox();

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith('outbox.cleanup.deleted', {
      deletedCount: 2,
      cutoff: '2026-02-01T00:00:00.000Z',
    });

    jest.useRealTimers();
  });
});
