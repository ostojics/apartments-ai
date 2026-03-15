import {FeedbackCreatedEvent} from './events/feedback-created.event';
import {FeedbackEntity} from './feedback.entity';

describe('FeedbackEntity', () => {
  it('creates feedback with default metadata', () => {
    const feedback = FeedbackEntity.create({
      tenantId: 'tenant-1',
      content: 'Great stay!',
    });

    expect(feedback.tenantId).toBe('tenant-1');
    expect(feedback.content).toBe('Great stay!');
    expect(feedback.metadata).toEqual({});

    const events = feedback.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(FeedbackCreatedEvent);
  });

  it('stores provided metadata', () => {
    const metadata = {source: 'web', rating: 5};
    const feedback = FeedbackEntity.create({
      tenantId: 'tenant-2',
      content: 'Thanks!',
      metadata,
    });

    expect(feedback.tenantId).toBe('tenant-2');
    expect(feedback.metadata).toEqual(metadata);
  });
});
