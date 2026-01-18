import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {FeedbackCommand} from '../commands/feedback.command';
import {
  IFeedbackRepository,
  FEEDBACK_REPOSITORY,
} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';

@CommandHandler(FeedbackCommand)
export class FeedbackHandler implements ICommandHandler<FeedbackCommand> {
  constructor(@Inject(FEEDBACK_REPOSITORY) private readonly feedbackRepository: IFeedbackRepository) {}

  async execute(command: FeedbackCommand): Promise<void> {
    const feedback = FeedbackEntity.create({
      content: command.content,
      metadata: command.feedbackMetadata,
    });

    await this.feedbackRepository.create(feedback);
  }
}
