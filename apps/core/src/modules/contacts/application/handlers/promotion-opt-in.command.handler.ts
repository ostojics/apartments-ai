import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PromotionOptInCommand} from '../commands/promotion-opt-in.command';
import {ContactEntity} from '../../domain/contact.entity';
import {CONTACT_REPOSITORY, IContactRepository} from '../../domain/repositories/contact.repository.interface';
import {IUnitOfWork, UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';
import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IContactsVoucherRepositoryPort} from '../ports/contacts.voucher.repository.port';
import {VoucherEntity} from 'src/modules/vouchers/domain/voucher.entity';
import {IContactsOutboxRepositoryPort} from '../ports/contacts.outbox.repository.port';
import {OutboxEntity} from 'src/modules/shared/domain/outbox/outbox.entity';
import {EmailJobs} from 'src/common/enums/jobs.enum';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {CONTACTS_OUTBOX_REPOSITORY_PORT, CONTACTS_VOUCHER_REPOSITORY_PORT} from '../ports/di-tokens';

@CommandHandler(PromotionOptInCommand)
export class PromotionOptInHandler implements ICommandHandler<PromotionOptInCommand> {
  constructor(
    @Inject(CONTACT_REPOSITORY) private readonly contactRepository: IContactRepository,
    @Inject(UNIT_OF_WORK) private readonly unitOfWork: IUnitOfWork,
    @Inject(DOMAIN_EVENT_DISPATCHER) private readonly eventDispatcher: IDomainEventDispatcher,
    @Inject(CONTACTS_VOUCHER_REPOSITORY_PORT) private readonly voucherRepository: IContactsVoucherRepositoryPort,
    @Inject(CONTACTS_OUTBOX_REPOSITORY_PORT) private readonly outboxRepository: IContactsOutboxRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  async execute(command: PromotionOptInCommand): Promise<void> {
    const existingContact = await this.contactRepository.findByEmailAndTenantId(command.email, command.tenantId);

    if (existingContact) {
      this.logger.info('Duplicate promotion opt-in detected', {
        tenantId: command.tenantId,
        email: command.email,
      });

      return;
    }

    const contact = ContactEntity.create({
      name: command.name,
      email: command.email,
      phoneNumber: command.phoneNumber,
      preferredLanguage: command.preferredLanguage,
      tenantId: command.tenantId,
    });

    const voucher = VoucherEntity.create({
      discountPercent: 10,
      email: command.email,
      tenantId: command.tenantId,
      metadata: {
        preferredLanguage: command.preferredLanguage,
        contactName: command.name,
      },
    });

    const outbox = OutboxEntity.create({
      jobType: EmailJobs.SEND_VOUCHER_EMAIL,
      tenantId: command.tenantId,
      payload: {
        email: command.email,
        tenantId: command.tenantId,
        voucherId: voucher.id,
        voucherCode: voucher.code,
        discountPercent: voucher.discountPercent,
        expiresAt: voucher.expiresAt.toISOString(),
      },
    });

    await this.unitOfWork.runInTransaction(async () => {
      await this.contactRepository.save(contact);
      await this.voucherRepository.save(voucher);
      await this.outboxRepository.save(outbox);
    });

    this.logger.info('Promotion opt-in processed', {
      tenantId: command.tenantId,
      email: command.email,
      voucherId: voucher.id,
      outboxId: outbox.id,
    });

    this.eventDispatcher.dispatch(contact);
  }
}
