export const QUEUE_SERVICE = Symbol('QUEUE_SERVICE');

export type QueueName = 'emails';

export interface IQueueService {
  enqueue<T = unknown>(
    queueName: QueueName,
    jobName: string,
    payload: T,
    opts?: {delayMs?: number; attempts?: number},
  ): Promise<string>;
}
