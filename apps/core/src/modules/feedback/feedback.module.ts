import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {FeedbackHandler} from './application/handlers/feedback.command.handler';
import {FEEDBACK_REPOSITORY} from './domain/repositories/feedback.repository.interface';
import {FeedbackOrmEntity} from './infrastructure/persistence/feedback.entity';
import {TypeOrmFeedbackRepository} from './infrastructure/persistence/typeorm-feedback.repository';
import {FeedbackController} from './presentation/controllers/feedback.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackOrmEntity])],
  controllers: [FeedbackController],
  providers: [
    FeedbackHandler,
    {
      provide: FEEDBACK_REPOSITORY,
      useClass: TypeOrmFeedbackRepository,
    },
  ],
  exports: [FEEDBACK_REPOSITORY],
})
export class FeedbackModule {}
