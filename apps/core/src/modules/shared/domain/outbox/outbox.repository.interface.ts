import {OutboxEntity} from './outbox.entity';

export const OUTBOX_REPOSITORY = Symbol('OUTBOX_REPOSITORY');

export interface IOutboxRepository {
  save(outbox: OutboxEntity): Promise<void>;
  findById(id: string): Promise<OutboxEntity | null>;
  findPendingToQueue(limit: number): Promise<OutboxEntity[]>;
}
