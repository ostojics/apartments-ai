import {Injectable} from '@nestjs/common';
import {IContactsOutboxRepositoryPort} from 'src/modules/contacts/application/ports/contacts.outbox.repository.port';
import {IOutboxRepository} from '../../../domain/outbox/outbox.repository.interface';
import {OutboxEntity} from '../../../domain/outbox/outbox.entity';

@Injectable()
export class ContactsOutboxRepositoryAdapter implements IContactsOutboxRepositoryPort {
  constructor(private readonly outboxRepository: IOutboxRepository) {}

  async save(outbox: OutboxEntity): Promise<void> {
    await this.outboxRepository.save(outbox);
  }
}
