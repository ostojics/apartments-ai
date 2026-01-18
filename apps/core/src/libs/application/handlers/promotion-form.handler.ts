import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PromotionFormCommand} from '../commands/promotion-form.command';
import {
  IFeedbackRepository,
  FEEDBACK_REPOSITORY,
} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';

@CommandHandler(PromotionFormCommand)
export class PromotionFormHandler implements ICommandHandler<PromotionFormCommand> {
  constructor(@Inject(FEEDBACK_REPOSITORY) private readonly feedbackRepository: IFeedbackRepository) {}

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

    await this.feedbackRepository.create(feedback);
  }
}
