import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {FeedbackCommand} from '../commands/feedback.command';
import {
  IFeedbackRepository,
  FEEDBACK_REPOSITORY,
} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';
import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IUnitOfWork, UNIT_OF_WORK} from '../ports/unit-of-work.port';

@CommandHandler(FeedbackCommand)
export class FeedbackHandler implements ICommandHandler<FeedbackCommand> {
  constructor(
    @Inject(FEEDBACK_REPOSITORY) private readonly feedbackRepository: IFeedbackRepository,
    @Inject(DOMAIN_EVENT_DISPATCHER) private readonly eventDispatcher: IDomainEventDispatcher,
    @Inject(UNIT_OF_WORK) private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(command: FeedbackCommand): Promise<void> {
    const feedback = FeedbackEntity.create({
      content: command.content,
      metadata: command.feedbackMetadata,
    });

    await this.unitOfWork.runInTransaction(async () => {
      await this.feedbackRepository.save(feedback);
    });

    this.eventDispatcher.dispatch(feedback);
  }
}
