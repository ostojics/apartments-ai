import {FeedbackEntity} from '../../domain/feedback.entity';
import {FeedbackOrmEntity} from '../persistence/feedback.entity';
import {FeedbackMapper} from './feedback.mapper';

describe('FeedbackMapper', () => {
  it('maps domain to persistence', () => {
    const feedback = FeedbackEntity.create({
      id: 'feedback-123',
      content: 'Great experience',
      metadata: {source: 'web'},
      createdAt: '2025-05-05T07:45:00.000Z',
    });

    const ormEntity = FeedbackMapper.toPersistence(feedback);

    expect(ormEntity).toBeInstanceOf(FeedbackOrmEntity);
    expect(ormEntity.id).toBe('feedback-123');
    expect(ormEntity.content).toBe('Great experience');
    expect(ormEntity.metadata).toEqual({source: 'web'});
    expect(ormEntity.createdAt.toISOString()).toBe('2025-05-05T07:45:00.000Z');
  });

  it('maps persistence to domain', () => {
    const ormEntity = new FeedbackOrmEntity();
    ormEntity.id = 'feedback-789';
    ormEntity.content = 'Needs improvement';
    ormEntity.metadata = {source: 'email'};
    ormEntity.createdAt = new Date('2025-06-06T06:30:00.000Z');

    const feedback = FeedbackMapper.toDomain(ormEntity);

    expect(feedback.id).toBe('feedback-789');
    expect(feedback.content).toBe('Needs improvement');
    expect(feedback.metadata).toEqual({source: 'email'});
    expect(feedback.createdAt).toBe('2025-06-06T06:30:00.000Z');
  });
});
