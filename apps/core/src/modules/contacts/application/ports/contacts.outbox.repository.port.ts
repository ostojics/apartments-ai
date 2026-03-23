import {OutboxEntity} from 'src/modules/shared/domain/outbox/outbox.entity';

export interface IContactsOutboxRepositoryPort {
  save(outbox: OutboxEntity): Promise<void>;
}
