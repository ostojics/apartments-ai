import {Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {subDays} from 'date-fns';
import {Queues} from 'src/common/enums/queues.enum';
import {IOutboxRepository, OUTBOX_REPOSITORY} from '../../domain/outbox/outbox.repository.interface';
import {IQueueService, QUEUE_SERVICE} from '../../application/queue/queue.service.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';

@Injectable()
export class OutboxScannerService {
  constructor(
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepository: IOutboxRepository,
    @Inject(QUEUE_SERVICE) private readonly queueService: IQueueService,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async scanAndEnqueue(): Promise<void> {
    const dueRows = await this.outboxRepository.findPendingToQueue(100);

    for (const outbox of dueRows) {
      const jobId = await this.queueService.enqueue(
        Queues.EMAILS,
        outbox.jobType,
        {outboxId: outbox.id},
        {attempts: 5},
      );

      outbox.markQueued();
      await this.outboxRepository.save(outbox);

      this.logger.info('outbox.queued', {outboxId: outbox.id, jobId, jobType: outbox.jobType});
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async cleanupSentOutbox(): Promise<void> {
    const cutoff = subDays(new Date(), 7);
    const deletedCount = await this.outboxRepository.deleteSentOlderThan(cutoff);

    if (deletedCount > 0) {
      this.logger.info('outbox.cleanup.deleted', {deletedCount, cutoff: cutoff.toISOString()});
    }
  }
}
