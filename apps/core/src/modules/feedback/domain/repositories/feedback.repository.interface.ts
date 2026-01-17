import {FeedbackEntity} from '../feedback.entity';

export const FEEDBACK_REPOSITORY = Symbol('FEEDBACK_REPOSITORY');

export interface IFeedbackRepository {
  create(feedback: FeedbackEntity): Promise<void>;
  findById(id: string): Promise<FeedbackEntity | null>;
}
