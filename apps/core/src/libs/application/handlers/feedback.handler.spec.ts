import {FeedbackHandler} from './feedback.handler';
import {FeedbackCommand} from '../commands/feedback.command';
import {IFeedbackRepository} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';

describe('FeedbackHandler', () => {
  const createFeedbackRepository = () => {
    const create = jest.fn();
    return {
      repository: {
        create,
        findById: jest.fn(),
      } as jest.Mocked<IFeedbackRepository>,
      create,
    };
  };

  it('saves feedback submissions', async () => {
    const {repository: feedbackRepository, create} = createFeedbackRepository();
    const handler = new FeedbackHandler(feedbackRepository);

    await handler.execute(
      new FeedbackCommand({
        content: 'Great experience!',
        feedbackMetadata: {rating: 5, source: 'web'},
      }),
    );

    expect(create).toHaveBeenCalledTimes(1);
    const [createdFeedback] = create.mock.calls[0] as [FeedbackEntity];
    expect(createdFeedback.content).toBe('Great experience!');
    expect(createdFeedback.metadata).toEqual({rating: 5, source: 'web'});
  });
});
