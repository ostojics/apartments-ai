import {PromotionFormHandler} from './promotion-form.handler';
import {PromotionFormCommand} from '../commands/promotion-form.command';
import {IFeedbackRepository} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';

describe('PromotionFormHandler', () => {
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

  it('saves promotion opt-in details as feedback metadata', async () => {
    const {repository: feedbackRepository, create} = createFeedbackRepository();
    const handler = new PromotionFormHandler(feedbackRepository);

    await handler.execute(
      new PromotionFormCommand({
        name: 'Jamie Doe',
        email: 'jamie@example.com',
        preferredLanguage: 'en-US',
      }),
    );

    expect(create).toHaveBeenCalledTimes(1);
    const [createdFeedback] = create.mock.calls[0] as [FeedbackEntity];
    expect(createdFeedback.content).toBe('promotion-opt-in');
    expect(createdFeedback.metadata).toEqual({
      type: 'promotion-opt-in',
      name: 'Jamie Doe',
      email: 'jamie@example.com',
      phone: null,
      preferredLanguage: 'en-US',
    });
  });
});
