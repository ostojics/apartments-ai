import {FeedbackHandler} from './feedback.command.handler';

import {IFeedbackRepository} from 'src/modules/feedback/domain/repositories/feedback.repository.interface';
import {FeedbackEntity} from 'src/modules/feedback/domain/feedback.entity';

import {IDomainEventDispatcher} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IUnitOfWork} from 'src/libs/application/ports/unit-of-work.port';
import {FeedbackCommand} from '../commands/feedback.command';

describe('FeedbackHandler', () => {
  const createFeedbackRepository = () => {
    const save = jest.fn();
    return {
      repository: {
        save,
        findById: jest.fn(),
      } as jest.Mocked<IFeedbackRepository>,
      save,
    };
  };

  const createUnitOfWork = () => {
    const runInTransaction = jest.fn(async (work: () => Promise<void>) => await work());
    return {
      unitOfWork: {runInTransaction} as IUnitOfWork,
      runInTransaction,
    };
  };

  const createEventDispatcher = () => {
    const dispatch = jest.fn();
    return {
      eventDispatcher: {dispatch} as IDomainEventDispatcher,
      dispatch,
    };
  };

  it('saves feedback submissions', async () => {
    const {repository: feedbackRepository, save} = createFeedbackRepository();
    const {unitOfWork, runInTransaction} = createUnitOfWork();
    const {eventDispatcher, dispatch} = createEventDispatcher();
    const handler = new FeedbackHandler(feedbackRepository, eventDispatcher, unitOfWork);

    await handler.execute(
      new FeedbackCommand({
        content: 'Great experience!',
        feedbackMetadata: {rating: 5, source: 'web'},
      }),
    );

    expect(runInTransaction).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledTimes(1);
    const [createdFeedback] = save.mock.calls[0] as [FeedbackEntity];
    expect(createdFeedback.content).toBe('Great experience!');
    expect(createdFeedback.metadata).toEqual({rating: 5, source: 'web'});
    expect(dispatch).toHaveBeenCalledWith(createdFeedback);
  });
});
