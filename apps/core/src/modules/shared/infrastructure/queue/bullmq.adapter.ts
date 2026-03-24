import {Injectable} from '@nestjs/common';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';
import {IQueueService, QueueName} from '../../application/queue/queue.service.interface';
import {Queues} from 'src/common/enums/queues.enum';

@Injectable()
export class BullMqAdapter implements IQueueService {
  constructor(@InjectQueue(Queues.EMAILS) private readonly emailsQueue: Queue) {}

  async enqueue<T = unknown>(
    queueName: QueueName,
    jobName: string,
    payload: T,
    opts?: {delayMs?: number; attempts?: number},
  ): Promise<string> {
    const targetQueue = this.emailsQueue;

    const job = await targetQueue.add(jobName, payload, {
      delay: opts?.delayMs,
      attempts: opts?.attempts,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });

    return String(job.id ?? `${queueName}:${jobName}`);
  }
}
