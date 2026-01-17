import {FeedbackCreatedEvent} from './events/feedback-created.event';
import {FeedbackEntity} from './feedback.entity';

describe('FeedbackEntity', () => {
  it('creates feedback with default metadata', () => {
    const feedback = FeedbackEntity.create({content: 'Great stay!'});

    expect(feedback.content).toBe('Great stay!');
    expect(feedback.metadata).toEqual({});

    const events = feedback.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(FeedbackCreatedEvent);
  });

  it('stores provided metadata', () => {
    const metadata = {source: 'web', rating: 5};
    const feedback = FeedbackEntity.create({content: 'Thanks!', metadata});

    expect(feedback.metadata).toEqual(metadata);
  });
});
