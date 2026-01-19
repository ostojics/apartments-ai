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

@CommandHandler(PromotionOptInCommand)
export class PromotionOptInHandler implements ICommandHandler<PromotionOptInCommand> {
  constructor(
    @Inject(CONTACT_REPOSITORY) private readonly contactRepository: IContactRepository,
    @Inject(UNIT_OF_WORK) private readonly unitOfWork: IUnitOfWork,
    @Inject(DOMAIN_EVENT_DISPATCHER) private readonly eventDispatcher: IDomainEventDispatcher,
  ) {}

  async execute(command: PromotionOptInCommand): Promise<void> {
    const contact = ContactEntity.create({
      name: command.name,
      email: command.email,
      phoneNumber: command.phoneNumber,
      preferredLanguage: command.preferredLanguage,
      tenantId: command.tenantId,
    });

    await this.unitOfWork.runInTransaction(async () => {
      await this.contactRepository.save(contact);
    });

    this.eventDispatcher.dispatch(contact);
  }
}
