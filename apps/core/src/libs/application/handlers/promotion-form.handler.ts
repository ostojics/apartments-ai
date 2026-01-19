import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PromotionFormCommand} from '../commands/promotion-form.command';
import {
  IFeedbackRepository,
  FEEDBACK_REPOSITORY,
} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';
import {UNIT_OF_WORK, IUnitOfWork} from '../ports/unit-of-work.port';
import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';

@CommandHandler(PromotionFormCommand)
export class PromotionFormHandler implements ICommandHandler<PromotionFormCommand> {
  constructor(
    @Inject(FEEDBACK_REPOSITORY) private readonly feedbackRepository: IFeedbackRepository,
    @Inject(UNIT_OF_WORK) private readonly unitOfWork: IUnitOfWork,
    @Inject(DOMAIN_EVENT_DISPATCHER) private readonly eventDispatcher: IDomainEventDispatcher,
  ) {}

  async execute(command: PromotionFormCommand): Promise<void> {
    const feedback = FeedbackEntity.create({
      content: 'promotion-opt-in',
      metadata: {
        type: 'promotion-opt-in',
        name: command.name,
        email: command.email,
        phone: command.phone ?? null,
        preferredLanguage: command.preferredLanguage,
      },
    });

    await this.unitOfWork.runInTransaction(async () => {
      await this.feedbackRepository.save(feedback);
    });

    this.eventDispatcher.dispatch(feedback);
  }
}
